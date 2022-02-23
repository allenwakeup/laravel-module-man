<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Requests;

use Goodcatch\Modules\Laravel\Http\Requests\CommonFormRequest as FormRequest;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;

class BaseRequest extends FormRequest
{


    /**
     * Get the validator instance for the request.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getValidatorInstance ()
    {
        $validator = parent::getValidatorInstance ();
        $lang = require __DIR__ . '/../../../resources/lang/zh-CN/validation.php';
        $validator->addCustomAttributes (Arr::get($lang,'attributes'));
        $validator->setCustomMessages (Arr::get($lang,'custom'));
        $validator->addCustomValues (Arr::get($lang,'values'));
        return $validator;
    }


}
