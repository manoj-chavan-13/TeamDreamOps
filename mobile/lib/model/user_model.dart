class User {
  final String fullName;
  final String emailOrMobile;
  final String password;

  User({
    required this.fullName,
    required this.emailOrMobile,
    required this.password,
  });

  @override
  String toString() {
    return 'User(fullName: $fullName, emailOrMobile: $emailOrMobile)';
  }
}
