<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCodeLengthFromManProcessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('man_processes', function (Blueprint $table) {
            $table->string('code',100)->change();
            $table->string('name',100)->change();
            $table->string('short',100)->change();
            $table->string('alias',100)->change();
            $table->string('display',100)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('man_processes', function (Blueprint $table) {

        });
    }
}
