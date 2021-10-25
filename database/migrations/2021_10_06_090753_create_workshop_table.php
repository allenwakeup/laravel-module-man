<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkshopTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('man_workshops', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger ('factory_id')->nullable (false)->default (0)->comment ('工厂');
            $table->string('code', 20)->nullable(false)->comment('编码');
            $table->string('name', 50)->nullable(false)->comment('名称');
            $table->string('short', 50)->nullable()->comment('简称');
            $table->string('alias', 50)->nullable()->comment('别名');
            $table->string('display', 50)->nullable()->comment('显示名称');
            $table->string ('description', 255)->nullable ()->comment ('描述');
            $table->integer('order')->nullable(false)->default (0)->comment('排序');
            $table->timestamps();
            $table->softDeletes();

            $table->unique('code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('man_workshops');
    }
}
