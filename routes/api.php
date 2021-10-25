<?php

use Goodcatch\Modules\Core\Repositories\Admin\DataMapRepository;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 *
 * @author allen <ali@goodcatch.cn>
 * 后台 路由
 *
 */
Route::group(
    [
        'as' => 'man::',
    ],
    function () {
        Route::prefix('Admin')->group(function(){
            Route::namespace('Admin')->prefix('goodcatch')->group(function(){
                Route::prefix(module_route_prefix())->group(function(){
                    Route::prefix('man')->name('admin.')->group(function(){
                        Route::group(['middleware'=>'jwt.admin'], function(){
                            Route::apiResources([
                                'bases'=>'BaseController', // 生产基地
                                'factories'=>'FactoryController', // 工厂
                                'workshops'=>'WorkshopController', // 车间
                                'processes'=>'ProcessController', // 工序
                            ], [
                                'parameters' => [
                                    'base' => 'id',
                                    'factory' => 'id',
                                    'workshop' => 'id',
                                    'process' => 'id',
                                ]
                            ]);
                        });
                    });
                });
            });
        });
    }
);


