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

class ProcessRepository extends Repository
{

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

    public static function select ($condition = [], $select = 'base', $keyword = null)
    {

        if(is_null($select)){
            $select = 'process';
        }

        $select_class = [
            'base' => Base::class,
            'factory' => Factory::class,
            'workshop' => Workshop::class,
            'process' => Process::class
        ][$select];

        if (isset ($select_class))
        {
            $select_query = $select_class::query ()
                ->select([
                    'name',
                    'name as label',
                    'name as title',
                    'name as text',
                    'id as value',
                    \DB::raw("'{$select}' as cascader")
                ]);
            if(!empty($keyword)){
                $select_query->with(['workshop.factory.base']);
                self::buildQuery($select_query, [
                    'name' => $keyword
                ]);
            }
            return $select_query
                ->where(function ($query) use ($condition, $keyword) {
                    self::buildQuery ($query, $condition);

                    if(!empty($keyword)){
                        $query->orWhereHas('workshop', function(Builder $has) use($keyword) {
                            $has->where('man_workshops.name', 'like', "%$keyword%");
                        });
                        $query->orWhereHas('factory', function(Builder $has) use($keyword) {
                            $has->where('man_factories.name', 'like', "%$keyword%");
                        });
                        $query->orWhereHas('base', function(Builder $has) use($keyword) {
                            $has->where('man_bases.name', 'like', "%$keyword%");
                        });
                    }

                })
                ->orderBy('order')
                ->get()
                ->transform (function ($item) use ($select) {
                    $item->value = $item->id;
                    $item->title = $item->name;
                    $item->text = $item->name;
                    $item->label = $item->name;
                    if ($select !== 'process')
                    {
                        $item->children = [];
                        $item->value .= $select;
                    }
                    $item->cascader = $select;
                    return $item;
                });
        }
        return \collect([]);

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
}
