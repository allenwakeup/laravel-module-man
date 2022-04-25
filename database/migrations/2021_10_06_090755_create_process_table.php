<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('man_processes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger ('workshop_id')->nullable (false)->default (0)->comment ('车间');
            $table->unsignedInteger ('item_id')->nullable (false)->default (0)->comment ('品类品项');
            $table->string('code', 20)->nullable(false)->comment('编码');
            $table->string('name', 20)->nullable(false)->comment('名称');
            $table->string('short', 10)->nullable()->comment('简称');
            $table->string('alias', 50)->nullable()->comment('别名');
            $table->string('display', 20)->nullable()->comment('显示名称');
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
        Schema::dropIfExists('man_processes');
    }
}
