const lessonFormats = [
  {
    label: 'accompagnementperso',
    pretty: 'Accompagnement personnalisé',
    formats: {
      default: ['accompagnement personnalise', 'accompagnemt perso']
    }
  },
  {
    label: 'atprofessionnalis',
    pretty: 'Atelier de professionnalisation',
    formats: {
      default: ['atelier de professionnalisation', 'at professionnalis']
    }
  },
  {
    label: 'artsplastiques',
    pretty: 'Arts plastiques',
    formats: {
      default: ['arts plastiques', 'artsplastiques']
    }
  },
  {
    label: 'bloc1smdsi',
    pretty: 'Bloc 1 : Support et mise a disposition des services informatiques',
    formats: {
      default: [
        'bloc 1 support et mise a disposition des services informatiques',
        'bloc 1 smdsi'
      ]
    }
  },
  {
    label: 'bloc2sisr',
    pretty: 'Bloc 2 : Solutions d’infrastructure systemes et réseaux',
    formats: {
      default: [
        'bloc 2 solutions d’infrastructure systemes et reseaux',
        'bloc 2 sisr'
      ]
    }
  },
  {
    label: 'bloc2slam',
    pretty: 'Bloc 2 : Solutions logicielles et applications métiers',
    formats: {
      default: [
        'bloc 2 solutions logicielles et applications metiers',
        'bloc 2 slam'
      ]
    }
  },
  {
    label: 'bloc3tp',
    pretty: 'Bloc 3 : Travaux pratiques',
    formats: {
      default: ['bloc 3 travaux pratiques', 'bloc 3 tp']
    }
  },
  {
    label: 'culecojurmanapp',
    pretty: 'Culture économique, juridique et managériale appliquée',
    formats: {
      default: [
        'culture economique juridique et manageriale appliquee',
        'cul eco jur man app'
      ]
    }
  },
  {
    label: 'culturegeneetexpr',
    pretty: 'Culture génerale et expression',
    formats: {
      default: ['culture generale et expression', 'culture gene et expr']
    }
  },
  {
    label: 'cultecojurmanag',
    pretty: 'Culture économique, juridique et managériale',
    formats: {
      default: [
        'culture economique juridique et manageriale',
        'cult eco jur manag'
      ]
    }
  },
  {
    label: 'dnlsesanglais',
    pretty: 'DNL : Sciences économiques et sociales en anglais',
    formats: {
      default: ['dnl ses anglais']
    }
  },
  {
    label: 'educationcivique',
    pretty: 'Éducation civique',
    formats: {
      default: ['education civique', 'education civique']
    }
  },
  {
    label: 'enseignscientifique',
    pretty: 'Enseignement scientifique',
    formats: {
      default: ['enseignement scientifique', 'enseign scientifique']
    }
  },
  {
    label: 'edphysiquesport',
    pretty: 'Éducation physique & sportive',
    formats: {
      default: [
        'education physique et sportive',
        'ed physique sport',
        'education physique et sportive',
        'eps'
      ]
    }
  },
  {
    label: 'educationmusicale',
    pretty: 'Éducation musicale',
    formats: {
      default: ['education musicale', 'education musicale']
    }
  },
  {
    label: 'francais',
    pretty: 'Français',
    formats: {
      default: ['français', 'francais']
    }
  },
  {
    label: 'histoiregeo',
    pretty: 'Histoire-Géographie',
    formats: {
      default: [
        'histoire geographie',
        'histoire geo',
        'histoire geograph',
        'histoire-geographie',
        'histoire-geographie'
      ]
    }
  },
  {
    label: 'humanlitterphilo',
    pretty: 'Humanites, Littérature & Philosophie',
    formats: {
      default: ['humanites litterature philosophie', 'human litter philo']
    }
  },
  {
    label: 'llcanglmondcont',
    pretty: 'LLCER Anglais Monde Contemporain',
    formats: {
      default: ['llcer anglais monde contemporain', 'llc angl mond cont']
    }
  },
  {
    label: 'mathspourinformatq',
    pretty: 'Mathématiques pour l’Informatique',
    formats: {
      default: ['mathematiques pour l’informatique', 'maths pour informatq']
    }
  },
  {
    label: 'mathematiques',
    pretty: 'Mathématiques',
    formats: {
      default: [
        'mathematiques',
        'mathematiques',
        'mathematiques 1ere',
        'math 1ere'
      ]
    }
  },
  {
    label: 'numeriquescinform',
    pretty: 'Numérique & Sciences Informatiques',
    formats: {
      default: ['numerique et sciences informatiques', 'numerique sc inform']
    }
  },
  {
    label: 'physiquechimie',
    pretty: 'Physique-Chimie',
    formats: {
      default: ['physique chimie', 'phys chim']
    }
  },
  {
    label: 'sceconosociales',
    pretty: 'Sciences Économiques & Sociales',
    formats: {
      default: [
        'sciences economiques et sociales',
        'sc econo sociales',
        'sciences economiques et sociales'
      ]
    }
  },
  {
    label: 'sciencesvieterre',
    pretty: 'Sciences de la Vie & de la Terre',
    formats: {
      default: [
        'sciences de la vie et de la terre',
        'sciences de la vie et de la terre',
        'sciences vie terre'
      ]
    }
  },
  {
    label: 'scnumeriqtechnol',
    pretty: 'Sciences Numériques & Technologie',
    formats: {
      default: ['sciences numeriques et technologie', 'sc numeriq technol']
    }
  },
  {
    label: 'viedeclasse',
    pretty: 'Vie de classe',
    formats: {
      default: ['vie de classe', 'vie de classe']
    }
  }
]

export const getSubjectName = subjectId => {
  let newSubjectId = subjectId.toLowerCase()
  newSubjectId = newSubjectId.split('ecrit')[0]
  newSubjectId = newSubjectId.split('oral')[0]

  let subject = lessonFormats.find(lesson => lesson.label === newSubjectId)

  let spec = ''
  if (subjectId.includes('ecrit')) {
    spec = 'écrit'
  } else if (subjectId.includes('oral')) {
    spec = 'oral'
  }

  return subject
    ? {
        ...subject,
        speciality: spec
      }
    : {
        label: subjectId,
        pretty: subjectId,
        formats: {
          default: [subjectId]
        }
      }
}
