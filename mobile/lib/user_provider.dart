import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/model/user_model.dart';
import 'package:flutter_riverpod/legacy.dart';

class UserNotifier extends StateNotifier<List<User>> {
  UserNotifier()
    : super([
        User(
          fullName: 'Manoj Chavan',
          emailOrMobile: 'manoj@google.com',
          password: 'securepass',
        ),
      ]);

  void addUser(User user) {
    state = [...state, user];
  }
}

final userListProvider = StateNotifierProvider<UserNotifier, List<User>>((ref) {
  return UserNotifier();
});
