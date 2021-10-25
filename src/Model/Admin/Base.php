<?php

namespace Goodcatch\Modules\Manufacturing\Model\Admin;

use Goodcatch\Modules\Manufacturing\Model\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Base extends Model
{
    use SoftDeletes;

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [
        'code' => [
            'searchType'    => 'like'
        ],
        'name' => [
            'searchType'    => 'like'
        ],
        'short' => [
            'searchType'    => 'like'
        ],
        'alias' => [
            'searchType'    => 'like'
        ],
        'display' => [
            'searchType'    => 'like'
        ],
        'description' => [
            'searchType'    => 'like'
        ]
    ];

    protected $guarded = [];

    public function factories ()
    {
        return $this->hasMany('Goodcatch\Modules\Manufacturing\Model\Admin\Factory');
    }

}
