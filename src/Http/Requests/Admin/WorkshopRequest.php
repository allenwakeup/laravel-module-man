<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Requests\Admin;

use Goodcatch\Modules\Manufacturing\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Manufacturing\Model\Admin\Workshop;

class WorkshopRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        $rules = [
            'factory_id' => 'required|exists:man_factories,id',
            'code' => ['required','max:20','alpha_dash', $this->uniqueOrExists (Workshop::class, 'code').':man_workshops'],
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
                    'factory_id' => 'exists:man_factories,id',
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
