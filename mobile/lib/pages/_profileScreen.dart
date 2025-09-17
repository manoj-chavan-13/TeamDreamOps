import 'package:mobile/pages/auth/loginScreen.dart';
import 'package:mobile/widgets/loading.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../widgets/profile_header.dart';
import '../widgets/profile_option_tile.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final bool _isLoading = false;
  final String _userName = "Manoj Chavan";
  final String _userRole = "Citizen Volunteer";

  @override
  void initState() {
    super.initState();
  }

  Future<void> logout(BuildContext context) async {
    // 1. Get an instance of SharedPreferences.
    final SharedPreferences prefs = await SharedPreferences.getInstance();

    // 2. Set the 'isLoggedIn' flag to false.
    await prefs.setBool('isLoggedIn', false);

    // It's good practice to check if the widget is still mounted before using its context.
    if (!context.mounted) return;

    // 3. Navigate to the LoginScreen and remove all previous routes from the stack.
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (Route<dynamic> route) => false, // This predicate removes all routes.
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: PulsatingDotsLoader());
    }

    return Container(
      color: const Color(0xFFF5F5F5),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const SizedBox(height: 70),
            ProfileHeader(userName: _userName, userRole: _userRole),
            const SizedBox(height: 24),
            const ProfileOptionTile(
              icon: Icons.person_outline,
              title: 'Edit Profile',
            ),
            const SizedBox(height: 12),
            const ProfileOptionTile(
              icon: Icons.settings_outlined,
              title: 'Settings',
            ),
            const SizedBox(height: 12),
            const ProfileOptionTile(
              icon: Icons.cloud_outlined,
              title: 'Offline Data',
            ),
            const SizedBox(height: 12),
            const ProfileOptionTile(
              icon: Icons.help_outline,
              title: 'Help & Support',
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  logout(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFFF1F0),
                  foregroundColor: Colors.red,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'Logout',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.red,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
