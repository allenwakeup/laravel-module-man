<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Repositories\Admin;

use Goodcatch\Modules\Manufacturing\Model\Admin\Base;
use Goodcatch\Modules\Manufacturing\Model\Admin\Factory;
use Goodcatch\Modules\Manufacturing\Repositories\BaseRepository as Repository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class FactoryRepository extends Repository
{
    public static function group()
    {
        return Factory::query()->with('base')->get()
            ->transform(function ($item){
                $item->value = $item->id;
                $item->title = $item->name;
                $item->text = $item->name;
                $item->label = $item->name;
                return $item;
            })
            ->groupBy('base.id');
    }

    public static function list($perPage, $condition = [], $keyword = null)
    {
        return Factory::query()
            ->with('base')
            ->where(function ($query) use ($condition, $keyword) {
                self::buildQuery($query, $condition);
                if (! empty ($keyword))
                {
                    self::buildSelect($query, $condition, $keyword);
                }
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public static function select ($condition = [], $keyword = null)
    {

        return Factory::query ()
            ->with('base')
            ->where(function ($query) use ($condition, $keyword) {
                $keywords = explode(' ', $keyword);
                foreach($keywords as $w){
                    $w = trim($w);
                    $query->where(function (Builder $and) use ($condition, $w){
                        if(!empty($w)){
                            $and->where('name', 'like', '%' . $w . '%');
                        }
                        if(!empty($w)) {
                            $and->orWhereHas('base', function(Builder $has) use($w) {
                                $has->where('man_bases.name', 'like', "%$w%");
                            });
                        }

                        if(Arr::has($condition, 'base_id') && !empty(Arr::get($condition, 'base_id'))) {
                            $and->whereHas('base', function(Builder $has) use ($condition) {
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
            'factory' => Factory::class
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
                    }

                })
                ->orderBy ('id', 'asc')
                ->get()
                ->transform (function ($item) use ($select) {
                    if ($select !== 'factory')
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
        return Factory::query()->create($data);
    }

    public static function update($id, $data)
    {
        return Factory::query()->where('id', $id)->update($data);
    }

    public static function find($id)
    {
        return Factory::query()->find($id);
    }

    public static function delete($id)
    {
        return Factory::destroy($id);
    }
}
