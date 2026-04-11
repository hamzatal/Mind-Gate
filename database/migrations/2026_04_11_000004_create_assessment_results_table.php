<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->unsignedTinyInteger('anxiety_score');
            $table->unsignedTinyInteger('stress_score');
            $table->unsignedTinyInteger('sleep_score');
            $table->unsignedTinyInteger('mood_score');
            $table->unsignedTinyInteger('focus_score');
            $table->unsignedTinyInteger('energy_score');
            $table->unsignedTinyInteger('total_score');
            $table->string('level'); // low | moderate | high
            $table->text('summary');
            $table->string('recommendation');
            $table->json('raw_answers')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_results');
    }
};
