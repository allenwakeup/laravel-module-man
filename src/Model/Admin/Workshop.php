<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Model\Admin;

use Goodcatch\Modules\Manufacturing\Model\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workshop extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [
        'factory_id' => [
            'searchType'    => '='
        ],
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

    public function factory ()
    {
        return $this->belongsTo('Goodcatch\Modules\Manufacturing\Model\Admin\Factory');
    }

    public function processes ()
    {
        return $this->hasMany('Goodcatch\Modules\Manufacturing\Model\Admin\Process');
    }

    public function children ()
    {
        return $this->hasMany('Goodcatch\Modules\Manufacturing\Model\Admin\Process');
    }
}
