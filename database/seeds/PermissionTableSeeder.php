<?php

namespace Database\Seeders;

use Goodcatch\Modules\Base\Traits\PermissionSeedsTrait;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    use PermissionSeedsTrait;

    const MODULE_NAME = 'man';
    const MODULE_MENU_TYPE = '2110';

    /**
     * generate api uri
     * @param string $path
     * @return string
     */
    protected function getSeedsApiUri ($path = '')
    {
        return '/Admin' . (empty ($path) ? '' : ('/' . $path));
    }

    public function getSeedsMenus (){
        return [
            [
                'name' => '主数据',
                'icon' => 'icon-gc-basic',
                'is_type' => self::MODULE_MENU_TYPE,
                'children' => [
                    [
                        'name' => '生产基地',
                        'icon' => 'icon-gc-bases',
                        'link' => $this->getSeedsApiUri('bases'),
                    ],

                ]
            ]
        ];
    }

    public function getSeedsPermissionGroups (){
        return [
            // 主数据
            // 生产基地
            $this->getSeedsModuleMenuGroupName('基地管理', '') => [
                self::MODULE_NAME . '::admin.bases'
            ]
        ];
    }
}
