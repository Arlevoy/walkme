import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../../shared/theme';

interface MapStyles {
  overlay: ViewStyle;
  title: TextStyle;
  description: TextStyle;
}

const styles = StyleSheet.create<MapStyles>({
  description: {
    color: theme.colors.black,
    fontSize: theme.font.size.M,
    margin: theme.spacing.unit,
  },
  overlay: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.unit,
    bottom: 0,
    display: 'flex',
    height: 300,
    margin: theme.spacing.unit * 3,
    opacity: 0.7,
    padding: theme.spacing.unit,
    position: 'absolute',
    width: '90%',
  },
  title: {
    color: theme.colors.primary,
    fontSize: theme.font.size.L,
    fontWeight: theme.font.weight.bold,
  },
});

interface OverlayCardProps {}

export const OverlayCard: FunctionComponent<OverlayCardProps> = () => (
  <ScrollView style={styles.overlay}>
    <Text style={styles.title}>My Home</Text>
    <Text style={styles.description}>
      orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
      of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </Text>
  </ScrollView>
);
