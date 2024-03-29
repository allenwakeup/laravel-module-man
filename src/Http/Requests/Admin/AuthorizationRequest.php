<?php

namespace Goodcatch\Modules\Manufacturing\Http\Requests\Admin;

class AuthorizationRequest extends FormRequest
{
    public function rules()
    {
        return [
            'username' => 'required|string|min:2',
            'password' => 'required|alpha_dash|min:6',
        ];
    }
}
