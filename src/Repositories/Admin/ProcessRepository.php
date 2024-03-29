<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Repositories\Admin;

use Goodcatch\Modules\Manufacturing\Model\Admin\Base;
use Goodcatch\Modules\Manufacturing\Model\Admin\Factory;
use Goodcatch\Modules\Manufacturing\Model\Admin\Process;
use Goodcatch\Modules\Manufacturing\Model\Admin\Workshop;
use Goodcatch\Modules\Manufacturing\Repositories\BaseRepository as Repository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class ProcessRepository extends Repository
{
    public static function group()
    {
        return Process::query()->with('workshop')->get()
            ->transform(function ($item){
                $item->value = $item->id;
                $item->title = $item->name;
                $item->text = $item->name;
                $item->label = $item->name;
                return $item;
            })
            ->groupBy('workshop.id');
    }

    public static function list($perPage, $condition = [], $keyword = null)
    {
        return Process::query()
            ->with('workshop.factory.base')
            ->where(function ($query) use ($condition, $keyword) {
                self::buildQuery($query, $condition);
                if (! empty ($keyword))
                {
                    self::buildQuery($query, [
                        'name' => $keyword
                    ]);
                }
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public static function select ($condition = [], $keyword = null)
    {
        return Process::query ()
            ->with('workshop.factory.base')
            ->where(function ($query) use ($condition, $keyword) {
                $keywords = explode(' ', $keyword);
                foreach($keywords as $w){
                    $w = trim($w);
                    $query->where(function (Builder $and) use ($condition, $w){
                        if(!empty($w)){
                            $and->where('name', 'like', '%' . $w . '%');
                        }
                        if(!empty($w)) {
                            $and->orWhereHas('workshop', function(Builder $has) use($w) {
                                $has->where('man_workshops.name', 'like', "%$w%");
                            });
                            $and->orWhereHas('workshop.factory', function(Builder $has) use($w) {
                                $has->where('man_factories.name', 'like', "%$w%");
                            });
                            $and->orWhereHas('workshop.factory.base', function(Builder $has) use($w) {
                                $has->where('man_bases.name', 'like', "%$w%");
                            });
                        }


                        if(Arr::has($condition, 'workshop_id') && !empty(Arr::get($condition, 'workshop_id'))) {
                            $and->whereHas('workshop', function(Builder $has) use ($condition) {
                                $has->where('man_workshops.id', Arr::get($condition, 'workshop_id'));
                            });
                        }
                        if(Arr::has($condition, 'factory_id') && !empty(Arr::get($condition, 'factory_id'))) {
                            $and->whereHas('workshop.factory', function(Builder $has) use ($condition) {
                                $has->where('man_factories.id', Arr::get($condition, 'factory_id'));
                            });
                        }
                        if(Arr::has($condition, 'base_id') && !empty(Arr::get($condition, 'base_id'))) {
                            $and->whereHas('workshop.factory.base', function(Builder $has) use ($condition) {
                                $has->where('man_bases.id', Arr::get($condition, 'base_id'));
                            });
                        }
                    });

                }
            })
            ->orderBy('order')
            ->get()
            ->transform (function ($item) {
                $item->value = $item->id;
                $item->title = $item->name;
                $item->text = $item->name;
                $item->label = $item->name;

                return $item;
            });
    }


    public static function cascader ($condition = [], $select = 'base', $keyword = null)
    {

        $select_class = [
            'base' => Base::class,
            'factory' => Factory::class,
            'workshop' => Workshop::class,
            'process' => Process::class
        ][$select];

        if (isset ($select_class))
        {
            $select_query =$select_class::query ()
                ->select([
                    'name',
                    'name as label',
                    \DB::raw("'{$select}' as cascader"),
                    "id as value",
                    "id as code"
                ]);
            if(!empty($keyword)){
                $select_query->with(['base']);
                self::buildQuery($select_query, [
                    'name' => $keyword
                ]);
            }
            return $select_query
                ->where(function ($query) use ($condition, $keyword) {
                    self::buildQuery ($query, $condition);

                    if(!empty($keyword)){
                        $query->orWhereHas('base', function(Builder $has) use($keyword) {
                            $has->where('man_bases.name', 'like', "%$keyword%");
                        });
                        $query->orWhereHas('factory', function(Builder $has) use($keyword) {
                            $has->where('man_factories.name', 'like', "%$keyword%");
                        });
                        $query->orWhereHas('workshop', function(Builder $has) use($keyword) {
                            $has->where('man_workshops.name', 'like', "%$keyword%");
                        });
                    }

                })
                ->orderBy('order')
                ->get()
                ->transform (function ($item) use ($select) {
                    if ($select !== 'process')
                    {
                        $item->isLeaf = false;
                    }
                    return $item;
                });

        }
        return \collect([]);

    }

    public static function add($data)
    {
        return Process::query()->create($data);
    }

    public static function update($id, $data)
    {
        return Process::query()->where('id', $id)->update($data);
    }

    public static function find($id)
    {
        return Process::query()->find($id);
    }

    public static function delete($id)
    {
        return Process::destroy($id);
    }

    public static function treeLevel()
    {
        $bases = Base::query()->with([
            'children:id,name,base_id',
            'children.children:id,name,factory_id',
            'children.children.children:id,name,workshop_id'
        ])->select('id', 'name')->get();

        $bases->transform(function ($base) {
            $base = self::makeTreeNode($base, 'b',$base->id);
            $base->children->transform(function ($factory) {
                $factory = self::makeTreeNode($factory,'f');
                $factory->children->transform(function ($workshop) {
                    $workshop = self::makeTreeNode($workshop,'w');
                    $workshop->children->transform(function ($process) {
                        return self::makeTreeNode($process,'p',$process->id);
                    });
                    return $workshop;
                });
                return $factory;
            });
            return $base;
        });
        return $bases;
    }

    public static function makeTreeNode($item,$keyPrefix,$value='')
    {
        $item->value = $value;
        $item->key = "{$keyPrefix}_{$item->id}";
        return $item;
    }
}
