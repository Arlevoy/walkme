import { OverlayCardInterface } from '#modules/map/presentation/OverlayCard/OverlayCard.interface';
import { PointOfInterest } from '#modules/routes/domain/route.interface';
import { theme } from '#shared/theme';
import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

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

interface OverlayCardProps {
  status: OverlayCardInterface['status'];
  onClose: () => void;
  poi: PointOfInterest;
}

export const OverlayCard: FunctionComponent<OverlayCardProps> = ({ status, onClose, poi }) => {
  return (
    <Modal
      style={styles.overlay}
      isVisible={status === 'DISPLAYED'}
      backdropOpacity={0}
      onBackdropPress={onClose}
    >
      <ScrollView>
        <Text style={styles.title}>{poi.title}</Text>
        <Text style={styles.description}>{poi.description}</Text>
      </ScrollView>
    </Modal>
  );
};
