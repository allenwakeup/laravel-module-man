<?php

namespace Goodcatch\Modules\Manufacturing\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;

class FormRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }
}
