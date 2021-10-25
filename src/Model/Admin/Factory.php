<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Model\Admin;

use Goodcatch\Modules\Manufacturing\Model\Model;
use Goodcatch\Modules\Core\Model\Admin\ModelMapping;

class Factory extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    protected $guarded = [];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [
        'base_id' => [
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


    public function base ()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\Base', 'base_id', 'id');
    }

    public function workshops ()
    {
        return $this->hasMany('Goodcatch\Modules\Manufacturing\Model\Admin\Workshop');
    }


}
