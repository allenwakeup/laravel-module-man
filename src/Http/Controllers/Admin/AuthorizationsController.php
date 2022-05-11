<?php

namespace Goodcatch\Modules\Manufacturing\Http\Controllers\Admin;

use Goodcatch\Modules\Manufacturing\Http\Requests\Admin\AuthorizationRequest;
use Illuminate\Auth\AuthenticationException;

class AuthorizationsController extends Controller
{
    public function store(AuthorizationRequest $request)
    {
        $username = $request->username;

        $credentials['username'] = $username;
        $credentials['password'] = $request->password;

        if (!$token = \Auth::guard('app')->attempt($credentials)) {
            return $this->errorResponse(401, trans('auth.failed'), 1001);
        }
        return $this->respondWithToken($token)->setStatusCode(201);
    }

    public function update()
    {
        $token = auth('app')->refresh();
        return $this->respondWithToken($token);
    }

    public function destroy()
    {
        auth('app')->logout();
        return response(null, 204);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth('app')->factory()->getTTL() * 60
        ]);
    }
}
