export default [
    // 核心模块
    {
        path:"/Admin/goodcatch/m/man/index",name:"goodcatch_m_man_index",component:()=>import("@/views/Admin/index"),children:[
            {path:"/Admin/goodcatch/m/man/index",name:"goodcatch_m_man_default",component:()=>import("@/views/Admin/default")}, // 打开默认页面

            // 主数据
            // 基地
            {path:"/Admin/goodcatch/m/man/bases",name:"goodcatch_m_man_admin_bases_index",component:()=>import("@/views/Admin/bases/index")}, // 基地列表
            {path:"/Admin/goodcatch/m/man/bases/form/:id?",name:"goodcatch_m_man_admin_bases_form",component:()=>import("@/views/Admin/bases/form")}, // 基地编辑

            // 工厂
            {path:"/Admin/goodcatch/m/man/factories",name:"goodcatch_m_man_admin_factories_index",component:()=>import("@/views/Admin/factories/index")}, // 工厂列表
            {path:"/Admin/goodcatch/m/man/factories/form/:id?",name:"goodcatch_m_man_admin_factories_form",component:()=>import("@/views/Admin/factories/form")}, // 工厂编辑

            // 车间
            {path:"/Admin/goodcatch/m/man/workshops",name:"goodcatch_m_man_admin_workshops_index",component:()=>import("@/views/Admin/workshops/index")}, // 车间列表
            {path:"/Admin/goodcatch/m/man/workshops/form/:id?",name:"goodcatch_m_man_admin_workshops_form",component:()=>import("@/views/Admin/workshops/form")}, // 车间编辑

            // 工序
            {path:"/Admin/goodcatch/m/man/processes",name:"goodcatch_m_man_admin_processes_index",component:()=>import("@/views/Admin/processes/index")}, // 工序列表
            {path:"/Admin/goodcatch/m/man/processes/form/:id?",name:"goodcatch_m_man_admin_processes_form",component:()=>import("@/views/Admin/processes/form")}, // 工序编辑

        ]
    }
];
