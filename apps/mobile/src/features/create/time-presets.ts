/**
 * Presets d'horaire de début pour une session, calculés depuis l'instant présent.
 * Pas de date-picker (aucune lib installée) : on propose des raccourcis en boutons.
 */

export type TimePreset = {
  /** Clé stable pour la sélection / le rendu. */
  key: string;
  /** Libellé affiché sur le bouton. */
  label: string;
  /** Instant de début résolu. */
  date: Date;
};

/** Pose l'heure/minute sur une copie de `base` (secondes et ms remis à zéro). */
function at(base: Date, hours: number, minutes = 0): Date {
  const d = new Date(base);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

/** Nombre de jours à ajouter à `from` pour atteindre le prochain samedi (0 si déjà samedi). */
function daysUntilSaturday(from: Date): number {
  const SATURDAY = 6;
  return (SATURDAY - from.getDay() + 7) % 7;
}

/**
 * Construit la liste des presets à partir de `now` (par défaut `new Date()`).
 * On n'affiche un preset que s'il est dans le futur, pour éviter de proposer
 * un horaire déjà passé (ex. « Ce soir 18 h » en soirée).
 */
export function buildTimePresets(now: Date = new Date()): TimePreset[] {
  const presets: TimePreset[] = [];

  // Dans 2 h — toujours dans le futur.
  const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  presets.push({ key: 'in-2h', label: 'Dans 2 h', date: inTwoHours });

  // Ce soir 18 h — uniquement s'il n'est pas encore passé.
  const tonight = at(now, 18);
  if (tonight.getTime() > now.getTime()) {
    presets.push({ key: 'tonight-18', label: 'Ce soir 18 h', date: tonight });
  }

  // Demain 10 h et 14 h.
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  presets.push({ key: 'tomorrow-10', label: 'Demain 10 h', date: at(tomorrow, 10) });
  presets.push({ key: 'tomorrow-14', label: 'Demain 14 h', date: at(tomorrow, 14) });

  // Ce week-end (samedi 10 h). Si on est déjà samedi, on vise le samedi suivant
  // pour que le preset reste distinct de « demain » / « dans 2 h ».
  const offset = daysUntilSaturday(now);
  const saturday = new Date(now);
  saturday.setDate(saturday.getDate() + (offset === 0 ? 7 : offset));
  presets.push({ key: 'weekend-sat-10', label: 'Ce week-end (sam. 10 h)', date: at(saturday, 10) });

  return presets;
}
