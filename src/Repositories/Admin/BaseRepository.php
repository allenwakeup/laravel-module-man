<?php

namespace Goodcatch\Modules\Manufacturing\Repositories\Admin;

use Goodcatch\Modules\Manufacturing\Model\Admin\Base;
use Goodcatch\Modules\Manufacturing\Repositories\BaseRepository as Repository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Stmt\Break_;

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

    public static function import(array $data_list,$baseColName='base',$factoryColName='factory',$workshopColName='workshop',$processColName='process')
    {
        $totals = Base::query()->with(['factories.workshops.processes'])->get();
        $bases = [];
        foreach ($totals as $base){
            Arr::set($bases,$base->name,$base->id);
            foreach ($base->factories as $factory){
                Arr::set($bases,"{$base->name}{$factory->name}",$factory->id);
                foreach ($factory->workshops as $workshop){
                    Arr::set($bases,"{$base->name}{$factory->name}{$workshop->name}",$workshop->id);
                    foreach ($workshop->processes as $process){
                        Arr::set($bases,"{$base->name}{$factory->name}{$workshop->name}{$process->name}",$process->id);
                    }
                }
            }
        }
        $added = 0;
        \collect($data_list)->each(function ($data) use ($processColName, $workshopColName, $factoryColName, $baseColName,&$bases, &$added) {
            $baseName = trim(Arr::get($data, $baseColName));
            $factoryName = trim(Arr::get($data, $factoryColName));
            $workshopName = trim(Arr::get($data, $workshopColName));
            $processName = trim(Arr::get($data, $processColName));

            $baseId = 0;
            $factoryId = 0;
            $workshopId = 0;
            collect([$baseName,$factoryName,$workshopName,$processName])->reduce(function ($path,$current,$key) use (
                $bases,
                &$added,
                &$baseId,
                &$factoryId,
                &$workshopId
            ) {
                if(empty($path)){
                    $path = $current;
                }else{
                    $path = $path.$current;
                }
                if($path){
                    if(!Arr::exists($bases,$path)){
                        try {
                            if($key===0){
                                $baseId = DB::table('man_bases')->insertGetId([
                                    'name' => $current,
                                    'code' => $path,
                                    'description' => $current,
                                    'created_at' => date('Y-m-d H:i:s'),
                                    'updated_at' => date('Y-m-d H:i:s'),
                                ]);
                                $added++;
                                Arr::set($bases, $path, $baseId);
                            }else if( $key === 1){
                                $factoryId = DB::table('man_factories')->insertGetId([
                                    'name' => $current,
                                    'code' => $path,
                                    'base_id' => $baseId,
                                    'description' => $current,
                                    'created_at' => date('Y-m-d H:i:s'),
                                    'updated_at' => date('Y-m-d H:i:s'),
                                ]);
                                $added++;
                                Arr::set($bases, $path, $factoryId);
                            }else if($key === 2) {
                                $workshopId = DB::table('man_workshops')->insertGetId([
                                    'name' => $current,
                                    'code' => $path,
                                    'factory_id' => $factoryId,
                                    'description' => $current,
                                    'created_at' => date('Y-m-d H:i:s'),
                                    'updated_at' => date('Y-m-d H:i:s'),
                                ]);
                                $added++;
                                Arr::set($bases, $path, $workshopId);
                            }else if($key === 3){
                                $processId = DB::table('man_processes')->insertGetId([
                                    'name' => $current,
                                    'code' => $path,
                                    'workshop_id' => $workshopId,
                                    'item_id' => 0,
                                    'description' => $current,
                                    'created_at' => date('Y-m-d H:i:s'),
                                    'updated_at' => date('Y-m-d H:i:s'),
                                ]);
                                $added++;
                                Arr::set($bases, $path, $processId);
                            }
                        } catch (QueryException $e) {
                            Log::error('导入基地出错:'.$e->getMessage());
                        }
                    }else{
                        switch ($key){
                            case 0:
                                $baseId = Arr::get($bases,$path);
                                break;
                            case 1:
                                $factoryId = Arr::get($bases,$path);
                                break;
                            case 2:
                                $workshopId = Arr::get($bases,$path);
                                break;
                        }
                    }

                }
                return $path;
            },'');
        });
        return $added;
    }
}
