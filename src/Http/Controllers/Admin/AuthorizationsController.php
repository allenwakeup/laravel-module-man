<?php

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\AuthorizationRequest;

class AuthorizationsController extends Controller
{
    public function store(AuthorizationRequest $request,$guard = 'admin')
    {
        $username = $request->username;

        $credentials['username'] = $username;
        $credentials['password'] = $request->password;
        if (!$token = \Auth::guard($guard)->attempt($credentials)) {
            return $this->error(trans('auth.failed'),[
                'access_token' => '',
                'token_type' => '',
                'expires_in' => ''
            ]);
        }
        return $this->success($this->respondWithToken($token));
    }

    public function update($guard = 'admin')
    {
        $token = auth($guard)->refresh();
        return $this->success($this->respondWithToken($token));
    }

    public function destroy($guard = 'admin')
    {
        auth($guard)->logout();
        return $this->success(null);
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth('admin')->factory()->getTTL() * 60
        ];
    }
}
