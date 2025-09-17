import 'package:mobile/pages/_homeScreen.dart';
import 'package:mobile/pages/_myReportScreen.dart';
import 'package:mobile/pages/_profileScreen.dart';
import 'package:mobile/pages/_socialFeedScreen.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MainNavigator extends StatefulWidget {
  const MainNavigator({super.key});

  @override
  State<MainNavigator> createState() => _MainNavigatorState();
}

class _MainNavigatorState extends State<MainNavigator> {
  int _selectedIndex = 0;

  static final List<Widget> _screens = <Widget>[
    HomeScreen(),
    MyReportsScreen(),
    FeedScreen(),
    ProfileScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],

      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color.fromARGB(255, 92, 185, 255),
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        backgroundColor: Colors.white,

        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.house),
            activeIcon: Icon(PhosphorIconsFill.house),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.fileText),
            activeIcon: Icon(PhosphorIconsFill.fileText),
            label: 'My Reports',
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.users),
            activeIcon: Icon(PhosphorIconsFill.users),
            label: 'Social Feed',
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.userCircle),
            activeIcon: Icon(PhosphorIconsFill.userCircle),
            label: 'Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}
