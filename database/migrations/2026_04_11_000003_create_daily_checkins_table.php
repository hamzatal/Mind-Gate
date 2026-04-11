<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('daily_checkins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedTinyInteger('mood');       // 1 - 10
            $table->unsignedTinyInteger('stress');     // 1 - 10
            $table->unsignedTinyInteger('energy');     // 1 - 10
            $table->unsignedTinyInteger('focus');      // 1 - 10
            $table->decimal('sleep_hours', 4, 1)->nullable();
            $table->text('notes')->nullable();
            $table->date('checkin_date');
            $table->timestamps();

            $table->unique(['user_id', 'checkin_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_checkins');
    }
};
