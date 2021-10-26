<?php

namespace Goodcatch\Modules\Manufacturing\Database\Seeders;

use Goodcatch\Modules\Base\Traits\PermissionSeedsTrait;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    use PermissionSeedsTrait;

    const MODULE_NAME = '生产制造';
    const MODULE_ALIAS = 'man';

    const MODULE_API_PREFIX = 'man';

    public function getSeedsMenus (){
        $menu_type = config('Manufacturing.menu.type');
        return [
            [
                'name' => self::MODULE_NAME,
                'icon' => 'icon-gc-' . self::MODULE_ALIAS,
                'is_type' => $menu_type,
                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'index'),
                'children' => [
                    [
                        'name' => '主数据',
                        'icon' => 'icon-gc-basic',
                        'is_type' => $menu_type,
                        'children' => [
                            [
                                'name' => '生产基地',
                                'icon' => 'icon-gc-bases',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'bases'),
                            ],
                            [
                                'name' => '工厂管理',
                                'icon' => 'icon-gc-factories',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'factories'),
                            ],
                            [
                                'name' => '车间管理',
                                'icon' => 'icon-gc-workshops',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'workshops'),
                            ],
                            [
                                'name' => '工序管理',
                                'icon' => 'icon-gc-processes',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'processes'),
                            ]
                        ]
                    ]
                ]

            ]
        ];
    }

    public function getSeedsPermissionGroups (){
        return [
            // 主数据
            // 生产基地
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '基地管理') => [
                self::MODULE_API_PREFIX . '::admin.bases'
            ],
            // 工厂管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '工厂管理') => [
                self::MODULE_API_PREFIX . '::admin.factories'
            ],
            // 车间管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '车间管理') => [
                self::MODULE_API_PREFIX . '::admin.workshops'
            ],
            // 工序管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '工序管理',) => [
                self::MODULE_API_PREFIX . '::admin.processes'
            ]
        ];
    }
}
