<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\ToDo;

class ToDoTest extends TestCase
{
    public function test_get_to_dos() {
      $user = User::factory()->create();
      $toDo = ToDo::create([
        'user_id' => $user->id,
        'description' => 'test description'
      ]);

      $response = $this->withSession(['banned' => false])->get('/api/todo');
      $response->assertStatus(302)->assertSee('Unauthorized');

      $response = $this->actingAs($user)->withSession(['banned' => false])->get('/api/todo');

      $response->assertStatus(200)->assertJson([
        'success' => true,
      ]);
    }

    public function test_create_to_dos() {
      $user = User::factory()->create();
      $request = [
        'description' => 'Some test description',
      ];

      $response = $this->withSession(['banned' => false])->post('/api/todo', $request);
      $response->assertStatus(302)->assertSee('Unauthorized');

      $response = $this->actingAs($user)->withSession(['banned' => false])->post('/api/todo', $request);
      $response->assertStatus(200)->assertJson([
        'success' => true
      ]);

      $response = $this->actingAs($user)->withSession(['banned' => false])->post('/api/todo', []);
      $response->assertStatus(302)->assertInvalid(['description']);
    }

    public function test_update_to_dos() {
      $user = User::factory()->create();
      $toDo = ToDo::create([
        'user_id' => $user->id,
        'description' => 'test description'
      ]);

      $request = [
        'checked' => true
      ];

      $response = $this->withSession(['banned' => false])->put('/api/todo/' . $toDo->id, $request);
      $response->assertStatus(302)->assertSee('Unauthorized');

      $response = $this->actingAs($user)->withSession(['banned' => false])->put('/api/todo/' . $toDo->id, $request);
      $response->assertStatus(200)->assertJson([
        'success' => true
      ]);

      $response = $this->actingAs($user)->withSession(['banned' => false])->put('/api/todo/' . $toDo->id, []);
      $response->assertStatus(302)->assertInvalid(['checked']);

      $response = $this->actingAs($user)->withSession(['banned' => false])->put('/api/todo/wrong-id', $request);
      $response->assertStatus(404)->assertSee('Id not found');
    }

    public function test_delete_to_dos() {
      $user = User::factory()->create();
      $toDo = ToDo::create([
        'user_id' => $user->id,
        'description' => 'test description'
      ]);

      $response = $this->withSession(['banned' => false])->delete('/api/todo/' . $toDo->id);
      $response->assertStatus(302)->assertSee('Unauthorized');

      $response = $this->actingAs($user)->withSession(['banned' => false])->delete('/api/todo/' . $toDo->id);
      $response->assertStatus(200)->assertJson([
        'success' => true
      ]);

      $response = $this->actingAs($user)->withSession(['banned' => false])->delete('/api/todo/wrong-id');
      $response->assertStatus(404)->assertSee('Id not found');
    }
}
