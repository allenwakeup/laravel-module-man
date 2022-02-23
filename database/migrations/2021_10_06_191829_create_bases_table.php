<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('man_bases', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code',20)->default('')->comment('编码');
            $table->string('name',20)->default('')->comment('名称');
            $table->string('short', 10)->nullable()->default('')->comment('简称');
            $table->string('alias', 20)->nullable()->default('')->comment('别名');
            $table->string('display', 20)->nullable()->default('')->comment('显示名称');
            $table->string('description', 255)->nullable()->nullable ()->comment ('描述');
            $table->integer('order')->nullable()->default (0)->comment('排序');
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
        Schema::dropIfExists('man_bases');
    }
}
