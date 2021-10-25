<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Repositories;


use Goodcatch\Modules\Laravel\Traits\Searchable;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class BaseRepository
{

    use Searchable;

    const TRANSFORM_TYPE_JSON                       = 'json';

    protected static function transform ($type, array &$array, $field)
    {
        if (! empty (Arr::get ($array, $field, '')))
        {
            switch ($type)
            {
                case self::TRANSFORM_TYPE_JSON :
                    Arr::set ($array, $field, json_decode (Arr::get ($array, $field), true));
                    break;
            }
        }
    }

    public static function tree(Collection $data, $pid = 0, $level = 0, $path = [])
    {
        if(isset($data)){
            return $data->where('pid', $pid)
                ->map(function ($model) use ($data, $level, $path) {
                    $mapped = array_merge($model->toArray(), [
                        'id' => $model->id,
                        'name' => $model->name,
                        'level' => $level,
                        'pid' => $model->pid,
                        'path' => $path
                    ]);

                    $child = $data->where('pid', $model->id);
                    if ($child->isEmpty()) {
                        return $mapped;
                    }

                    array_push($path, $model->id);
                    $mapped['children'] = self::tree($data, $model->id, $level + 1, $path)->values()->all();
                    return $mapped;
                })
                ->values();
        }
        return \collect([]);
    }




}
