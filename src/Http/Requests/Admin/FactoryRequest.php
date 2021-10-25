<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Requests\Admin;

use Goodcatch\Modules\Manufacturing\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Manufacturing\Model\Admin\Factory;

class FactoryRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        $rules = [
            'base_id' => 'required|exists:man_bases,id',
            'code' => ['required', 'max:20', $this->uniqueOrExists (Factory::class, 'code') . ':man_factories'],
            'name' => 'max:20',
            'short' => 'max:20',
            'alias' => 'max:20',
            'display' => 'max:20',
            'description' => 'max:255',
        ];
        switch ($this->method()) {
            case 'GET':
                $rules = [
                    'base_id' => 'exists:man_bases,id',
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
