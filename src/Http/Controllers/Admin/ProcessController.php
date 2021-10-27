<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\ProcessRequest;
use Goodcatch\Modules\Manufacturing\Http\Resources\Admin\ProcessResource\ProcessCollection;
use Goodcatch\Modules\Manufacturing\Repositories\Admin\ProcessRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;


class ProcessController extends Controller
{



    /**
     * Display a listing of the resource.
     *
     * @return array|\Illuminate\Http\Response
     */
    public function index(ProcessRequest $request)
    {
        $data_type = $request->get ('data_type');
        $condition = $request->validated();

        if ($data_type === 'select') {
            $data = ProcessRepository::select ($condition, $request->keyword);
        } else if ($data_type === 'cascader') {
            $condition = $request->only ([ 'base_id' ]);
            $data = ProcessRepository::cascader ($condition, $request->get($data_type), $request->keyword);
        } else {
            $data = ProcessRepository::list(
                $request->per_page??30,
                $condition,
                $request->keyword
            );
        }
        if($data instanceof Collection){
            return $this->success($data, __('base.success'));
        }
        return $this->success(new ProcessCollection($data), __('base.success'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProcessRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProcessRequest $request)
    {
        try{
            $data = ProcessRepository::add($request->validated());
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
        return $this->success(ProcessRepository::find($id), __('base.success'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProcessRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProcessRequest $request, $id)
    {

        try{
            $res = ProcessRepository::update($id, $request->validated());
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
            $data = ProcessRepository::delete($idArray);
            return $this->success($data, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }
}
