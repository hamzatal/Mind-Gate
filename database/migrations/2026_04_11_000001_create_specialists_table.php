<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('specialists', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('job_title')->nullable();
            $table->string('specialization');
            $table->string('languages')->nullable();
            $table->string('session_mode')->default('online'); // online | in_person | both
            $table->string('city')->nullable();
            $table->text('bio')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('specialists');
    }
};
