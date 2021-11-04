<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\WorkshopRequest;
use Goodcatch\Modules\Manufacturing\Http\Resources\Admin\WorkshopResource\WorkshopCollection;
use Goodcatch\Modules\Manufacturing\Repositories\Admin\WorkshopRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class WorkshopController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return array|\Illuminate\Http\Response
     */
    public function index(WorkshopRequest $request)
    {
        $data_type = $request->get ('data_type');
        $condition = $request->validated();

        if ($data_type === 'select') {
            $condition = $request->only ([ 'base_id', 'factory_id' ]);
            $data = WorkshopRepository::select ($condition, $request->keyword);
        } else if ($data_type === 'cascader') {
            $condition = $request->only ([ 'base_id' ]);
            $data = WorkshopRepository::cascader ($condition, $request->get($data_type), $request->keyword);
        } else {
            $data = WorkshopRepository::list(
                $request->per_page??30,
                $condition,
                $request->keyword
            );
        }
        if($data instanceof Collection){
            return $this->success($data, __('base.success'));
        }
        return $this->success(new WorkshopCollection($data), __('base.success'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  WorkshopRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(WorkshopRequest $request)
    {
        try{
            $data = WorkshopRepository::add($request->validated());
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
        return $this->success(WorkshopRepository::find($id), __('base.success'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  WorkshopRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(WorkshopRequest $request, $id)
    {

        try{
            $res = WorkshopRepository::update($id, $request->validated());
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
            $data = WorkshopRepository::delete($idArray);
            return $this->success($data, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }
}
