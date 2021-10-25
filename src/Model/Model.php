<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Manufacturing\Model;

use DateTimeInterface;
use Goodcatch\Modules\Laravel\Model\Model as BaseModel;

abstract class Model extends BaseModel
{

    /**
     * add prefix to module table name
     *
     * @var string module table with prefix
     * @return string prefix of table name
     */
    protected function getModuleTablePrefix () {
        return 'man_';
    }

    /**
     * Prepare a date for array / JSON serialization.
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }

}
