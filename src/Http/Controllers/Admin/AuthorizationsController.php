<?php

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\AuthorizationRequest;
use Illuminate\Auth\AuthenticationException;
use App\Http\Controllers\Controller;

class AuthorizationsController extends Controller
{
    public function store(AuthorizationRequest $request)
    {
        $username = $request->username;

        $credentials['username'] = $username;
        $credentials['password'] = $request->password;

        if (!$token = \Auth::guard('app')->attempt($credentials)) {
            return $this->error(trans('auth.failed'),null);
        }
        return $this->success($this->respondWithToken($token));
    }

    public function update()
    {
        $token = auth('app')->refresh();
        return $this->success($this->respondWithToken($token));
    }

    public function destroy()
    {
        auth('app')->logout();
        return $this->success(null);
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth('app')->factory()->getTTL() * 60
        ];
    }
}
