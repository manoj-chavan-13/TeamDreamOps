// lib/widgets/pulsating_dots_loader.dart
import 'package:flutter/material.dart';

class PulsatingDotsLoader extends StatefulWidget {
  const PulsatingDotsLoader({super.key});

  @override
  State<PulsatingDotsLoader> createState() => _PulsatingDotsLoaderState();
}

class _PulsatingDotsLoaderState extends State<PulsatingDotsLoader>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Animation<double>> _animations;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(); // Make the animation loop

    // Create three staggered animations from the single controller
    _animations = List.generate(3, (index) {
      return Tween(begin: 0.2, end: 1.0).animate(
        CurvedAnimation(
          parent: _controller,
          // Stagger the start of each dot's animation
          curve: Interval(
            0.15 * index,
            0.5 + 0.15 * index,
            curve: Curves.easeInOut,
          ),
        ),
      );
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(3, (index) {
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 6.0),
              // Use ScaleTransition to animate the size of the dot
              child: ScaleTransition(
                scale: _animations[index],
                child: _buildDot(),
              ),
            );
          }),
        ),
      ),
    );
  }

  Widget _buildDot() {
    return Container(
      width: 20,
      height: 20,
      decoration: BoxDecoration(color: Colors.blue, shape: BoxShape.circle),
    );
  }
}
