import { FmpButton } from '@/components/FmpButton';
import { ALL_TEAMS, TOTAL_STICKERS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface PlanProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  onPress: () => void;
}

function PlanCard({ name, price, period, features, highlight, badge, onPress }: PlanProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.plan,
        highlight && styles.planHighlight,
        { opacity: pressed ? 0.9 : 1 },
      ]}
    >
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <Text style={[styles.planName, highlight && styles.planNameHighlight]}>{name}</Text>
      <View style={styles.priceRow}>
        <Text style={[styles.price, highlight && styles.priceHighlight]}>{price}</Text>
        <Text style={[styles.period, highlight && styles.periodHighlight]}>{period}</Text>
      </View>
      <View style={styles.featureList}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={[styles.featureCheck, highlight && { color: Colors.gold }]}>✓</Text>
            <Text style={[styles.featureText, highlight && styles.featureTextHighlight]}>{f}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.planBtn, highlight && styles.planBtnHighlight]}>
        <Text style={[styles.planBtnText, highlight && styles.planBtnTextHighlight]}>
          {highlight ? 'Choisir PRO' : 'Commencer'}
        </Text>
      </View>
    </Pressable>
  );
}

export default function PremiumScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.title}>FMP Premium</Text>
          <Text style={styles.subtitle}>Complète ta collection plus vite</Text>
        </View>

        {/* Plans */}
        <PlanCard
          name="Gratuit"
          price="0€"
          period="pour toujours"
          features={[
            `${ALL_TEAMS.length} équipes, ${TOTAL_STICKERS} stickers`,
            'Scanner caméra',
            'Album & wishlist',
            'Publicités',
          ]}
          onPress={() => router.back()}
        />

        <PlanCard
          name="PRO"
          price="2,99€"
          period="/ mois"
          features={[
            'Tout le mode Gratuit',
            'Sans publicités',
            'Stats avancées',
            'Export liste doublons',
            'Thèmes premium',
          ]}
          highlight
          badge="POPULAIRE"
          onPress={() => router.back()}
        />

        <PlanCard
          name="World Cup Pass"
          price="9,99€"
          period="paiement unique"
          features={[
            'Tout le mode PRO',
            'Accès à vie',
            'Notifications sorties packs',
            'Carte des événements CDM',
          ]}
          onPress={() => router.back()}
        />

        <Text style={styles.legal}>
          Paiement via l'App Store ou Google Play. Annulation possible à tout moment.
        </Text>

        <FmpButton label="Continuer sans Pro" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  scroll: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  starIcon: {
    fontSize: 48,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['3xl'],
    color: Colors.gold,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: 'rgba(255,255,255,0.6)',
  },
  plan: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 12,
    position: 'relative',
  },
  planHighlight: {
    backgroundColor: Colors.red,
    borderColor: Colors.gold,
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: Colors.gold,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xs,
    color: Colors.black,
    letterSpacing: 1,
  },
  planName: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xl,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  planNameHighlight: {
    color: '#FFFFFF',
    fontSize: FontSizes['2xl'],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['3xl'],
    color: '#FFFFFF',
  },
  priceHighlight: {
    color: Colors.gold,
    fontSize: FontSizes['4xl'],
  },
  period: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  periodHighlight: {
    color: 'rgba(255,215,0,0.7)',
  },
  featureList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureCheck: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.turf,
    fontWeight: '700',
  },
  featureText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },
  featureTextHighlight: {
    color: '#FFFFFF',
  },
  planBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  planBtnHighlight: {
    backgroundColor: Colors.gold,
  },
  planBtnText: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.md,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  planBtnTextHighlight: {
    color: Colors.black,
    fontSize: FontSizes.lg,
  },
  legal: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    lineHeight: 18,
  },
});
