<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\FactoryRequest;
use Goodcatch\Modules\Manufacturing\Http\Resources\Admin\FactoryResource\FactoryCollection;
use Goodcatch\Modules\Manufacturing\Repositories\Admin\FactoryRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class FactoryController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return array|\Illuminate\Http\Response
     */
    public function index(FactoryRequest $request)
    {
        $data_type = $request->get ('data_type');
        $condition = $request->validated();

        if ($data_type === 'select') {
            $data = FactoryRepository::select ($condition, $request->keyword);
        } else if ($data_type === 'cascader') {
            $condition = $request->only ([ 'base_id' ]);
            $data = FactoryRepository::cascader ($condition, $request->get($data_type), $request->keyword);
        } else {
            $data = FactoryRepository::list(
                $request->per_page??30,
                $condition,
                $request->keyword
            );
        }
        if($data instanceof Collection){
            return $this->success($data, __('base.success'));
        }
        return $this->success(new FactoryCollection($data), __('base.success'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  FactoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FactoryRequest $request)
    {
        try{
            $data = FactoryRepository::add($request->validated());
            return $this->success($data, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据已存在' : '其它错误'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->success(FactoryRepository::find($id), __('base.success'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  FactoryRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FactoryRequest $request, $id)
    {

        try{
            $res = FactoryRepository::update($id, $request->validated());
            return $this->success($res, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据已存在' : '其它错误'));
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
        try{
            $data = FactoryRepository::delete($idArray);
            return $this->success($data, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }



}
