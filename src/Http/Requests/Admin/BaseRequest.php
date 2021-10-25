<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Requests\Admin;

use Goodcatch\Modules\Laravel\Http\Requests\CommonFormRequest as FormRequest;
use Goodcatch\Modules\Manufacturing\Model\Admin\Base;

class BaseRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        $rules = [
            'code' => ['required', 'max:20', $this->uniqueOrExists (Base::class, 'code') . ':man_bases'],
            'name' => 'max:20',
            'short' => 'max:20',
            'alias' => 'max:20',
            'display' => 'max:20',
            'description' => 'max:255',
        ];
        switch ($this->method()) {
            case 'GET':
                $rules = [
                    'code' => 'max:20',
                    'name' => 'max:20',
                    'short' => 'max:20',
                    'alias' => 'max:20',
                    'display' => 'max:20',
                    'description' => 'max:255'
                ];
                break;
        }
        return $rules;
    }

}