<?php

return [
    'name' => 'Manufacturing',

    'auth' => [
        'guards' => [
            'api' => 'device',
            // 下面作为android登录验证时使用
//            'app' => [
//                'driver' => 'jwt',
//                'provider' => 'admins',
//            ],
        ]
    ],

    'menu' => [
        'type' => 121
    ]
];
