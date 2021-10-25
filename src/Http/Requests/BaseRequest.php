<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Http\Requests;

use Goodcatch\Modules\Laravel\Http\Requests\CommonFormRequest as FormRequest;

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
        $validator->addCustomAttributes (__ ('man::validation.attributes'));
        $validator->setCustomMessages (__ ('man::validation.custom'));
        $validator->addCustomValues (__ ('man::validation.values'));
        return $validator;
    }


}
