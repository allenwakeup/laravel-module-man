<?php

namespace Goodcatch\Modules\Manufacturing\Repositories\Admin;

use Goodcatch\Modules\Manufacturing\Model\Admin\Base;
use Goodcatch\Modules\Manufacturing\Repositories\BaseRepository as Repository;

class BaseRepository extends Repository
{

    public static function list ($perPage, $condition = [], $keyword = null)
    {
        return Base::query()
            ->where(function ($query) use ($condition, $keyword) {
                self::buildQuery($query, $condition);
                if (! empty ($keyword))
                {
                    self::buildQuery($query, ['name' => $keyword]);
                }
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public static function select ($condition = [], $keyword = null)
    {
        return Base::query()
            ->where(function ($query) use ($condition, $keyword) {
                self::buildQuery ($query, $condition);
                if (! empty ($keyword))
                {
                    $query->where('name', 'like', '%' . $keyword . '%');
                }
            })
            ->orderBy('order')
            ->get()
            ->map(function (Base $item) {
                $map = $item->toArray();
                $name = $item->name;
                $map['value'] = $item->id;
                $map['title'] = $name;
                $map['text'] = $name;
                $map['label'] = $name;
                return $map;
            });
    }

    public static function add ($data)
    {
        return Base::query ()->create ($data);
    }

    public static function update ($id, $data)
    {
        return Base::find ($id)->update ($data);
    }

    public static function find ($id)
    {
        return Base::query ()->find ($id);
    }

    public static function delete ($id)
    {
        return Base::destroy ($id);
    }

}