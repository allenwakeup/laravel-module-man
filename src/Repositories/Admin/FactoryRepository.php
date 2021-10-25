<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Repositories\Admin;

use Goodcatch\Modules\Manufacturing\Model\Admin\Base;
use Goodcatch\Modules\Manufacturing\Model\Admin\Factory;
use Goodcatch\Modules\Manufacturing\Repositories\BaseRepository as Repository;
use Illuminate\Database\Eloquent\Builder;

class FactoryRepository extends Repository
{

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

    public static function select ($condition = [], $select = 'base', $keyword = null)
    {

        $select_class = [
            'base' => Base::class,
            'factory' => Factory::class
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
                ->orderBy('order')
                ->get()
                ->transform (function ($item) use ($select) {
                if ($select !== 'factory')
                {
                    $item->children = [];
                    $item->value .= $select;
                }
                return $item;
            });

        }
        return \collect([]);

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