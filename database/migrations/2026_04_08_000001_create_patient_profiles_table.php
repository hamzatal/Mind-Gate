<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            $table->string('current_mood')->nullable();
            $table->string('stress_level')->nullable();
            $table->string('anxiety_level')->nullable();
            $table->string('sleep_quality')->nullable();
            $table->string('focus_level')->nullable();
            $table->string('energy_level')->nullable();
            $table->string('support_history')->nullable();

            $table->text('primary_concern')->nullable();
            $table->text('support_goal')->nullable();
            $table->string('preferred_support_style')->nullable();
            $table->text('notes')->nullable();

            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_profiles');
    }
};
