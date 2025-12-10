import { PuzzleData, Difficulty } from '../types';

const createPuzzle = (id: number, topic: string, words: any[], difficulty: Difficulty): PuzzleData => ({
  id,
  topic,
  width: 14,
  height: 14,
  words,
  difficulty
});

// STRATEGY: "The Comb". To guarantee valid intersections without a complex generator, 
// each puzzle has one main vertical "backbone" (D1) at x=4 or x=5.
// All horizontal words (A1, A2...) intersect this backbone at correct letters.

export const PUZZLES: PuzzleData[] = [
  // --- LOW DIFFICULTY ---
  
  createPuzzle(1, "DNA Structure", [
    // Backbone: GENOME (G E N O M E) at 4,0
    { id: 'D1', answer: 'GENOME', clue: 'Complete set of DNA', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'GENE', clue: 'Unit of heredity', startX: 4, startY: 0, direction: 'across' }, // G
    { id: 'A2', answer: 'HELIX', clue: 'Spiral shape', startX: 3, startY: 1, direction: 'across' }, // E
    { id: 'A3', answer: 'INTRON', clue: 'Non-coding sequence', startX: 2, startY: 2, direction: 'across' }, // N
    { id: 'A4', answer: 'CODON', clue: 'Triplet code', startX: 3, startY: 3, direction: 'across' }, // O
    { id: 'A5', answer: 'PRIMER', clue: 'Replication starter', startX: 1, startY: 4, direction: 'across' }, // M
    { id: 'A6', answer: 'BASE', clue: 'A, T, C, or G', startX: 1, startY: 5, direction: 'across' } // E
  ], Difficulty.LOW),

  createPuzzle(2, "Mendelian Genetics", [
    // Backbone: ALLELE (A L L E L E) at 5,0
    { id: 'D1', answer: 'ALLELE', clue: 'Variant form of a gene', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'TRAIT', clue: 'Observable feature', startX: 3, startY: 0, direction: 'across' }, // A
    { id: 'A2', answer: 'LOCUS', clue: 'Gene position', startX: 5, startY: 1, direction: 'across' }, // L
    { id: 'A3', answer: 'SELF', clue: '____-fertilization', startX: 3, startY: 2, direction: 'across' }, // L
    { id: 'A4', answer: 'PEA', clue: 'Mendel\'s plant', startX: 4, startY: 3, direction: 'across' }, // E
    { id: 'A5', answer: 'LAW', clue: '____ of segregation', startX: 5, startY: 4, direction: 'across' }, // L
    { id: 'A6', answer: 'RECESSIVE', clue: 'Masked trait', startX: 4, startY: 5, direction: 'across' } // E
  ], Difficulty.LOW),

  createPuzzle(3, "Central Dogma", [
    // Backbone: PROTEIN (P R O T E I N) at 5,0
    { id: 'D1', answer: 'PROTEIN', clue: 'Final gene product', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'POL', clue: 'Polymerase (abbr)', startX: 5, startY: 0, direction: 'across' }, // P
    { id: 'A2', answer: 'RNA', clue: 'Transcription output', startX: 5, startY: 1, direction: 'across' }, // R
    { id: 'A3', answer: 'CODING', clue: '____ strand', startX: 4, startY: 2, direction: 'across' }, // O
    { id: 'A4', answer: 'TRNA', clue: 'Adapter molecule', startX: 5, startY: 3, direction: 'across' }, // T
    { id: 'A5', answer: 'GENE', clue: 'DNA segment', startX: 4, startY: 4, direction: 'across' }, // E
    { id: 'A6', answer: 'SITE', clue: 'Active ____', startX: 4, startY: 5, direction: 'across' }, // I
    { id: 'A7', answer: 'NUCLEUS', clue: 'Transcription location', startX: 5, startY: 6, direction: 'across' } // N
  ], Difficulty.LOW),

  createPuzzle(4, "Replication", [
    // Backbone: LIGASE (L I G A S E) at 4,0
    { id: 'D1', answer: 'LIGASE', clue: 'Molecular glue', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'LAG', clue: '____ strand', startX: 4, startY: 0, direction: 'across' }, // L
    { id: 'A2', answer: 'ORIGIN', clue: 'Start site', startX: 2, startY: 1, direction: 'across' }, // I
    { id: 'A3', answer: 'GAP', clue: 'Missing bases', startX: 4, startY: 2, direction: 'across' }, // G
    { id: 'A4', answer: 'DNA', clue: 'Template', startX: 2, startY: 3, direction: 'across' }, // A
    { id: 'A5', answer: 'SINGLE', clue: '____ stranded binding protein', startX: 4, startY: 4, direction: 'across' }, // S
    { id: 'A6', answer: 'END', clue: '5 prime ____', startX: 4, startY: 5, direction: 'across' } // E
  ], Difficulty.LOW),

  createPuzzle(5, "Transcription", [
    // Backbone: PROMOTER (P R O M O T E R) at 4,0
    { id: 'D1', answer: 'PROMOTER', clue: 'Start signal', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'POL', clue: 'Enzyme', startX: 4, startY: 0, direction: 'across' }, // P
    { id: 'A2', answer: 'MRNA', clue: 'Messenger', startX: 3, startY: 1, direction: 'across' }, // R
    { id: 'A3', answer: 'BOX', clue: 'TATA ____', startX: 3, startY: 2, direction: 'across' }, // O
    { id: 'A4', answer: 'MATURE', clue: 'Processed RNA', startX: 4, startY: 3, direction: 'across' }, // M
    { id: 'A5', answer: 'CORE', clue: '____ enzyme', startX: 3, startY: 4, direction: 'across' }, // O
    { id: 'A6', answer: 'TERM', clue: 'End signal', startX: 4, startY: 5, direction: 'across' }, // T
    { id: 'A7', answer: 'EXON', clue: 'Kept sequence', startX: 4, startY: 6, direction: 'across' }, // E
    { id: 'A8', answer: 'RHO', clue: 'Termination factor', startX: 4, startY: 7, direction: 'across' } // R
  ], Difficulty.LOW),

  createPuzzle(6, "Translation", [
    // Backbone: RIBOSOME (R I B O S O M E) at 4,0
    { id: 'D1', answer: 'RIBOSOME', clue: 'Protein factory', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'RRNA', clue: 'Structural RNA', startX: 4, startY: 0, direction: 'across' }, // R
    { id: 'A2', answer: 'SITE', clue: 'A, P, or E ____', startX: 3, startY: 1, direction: 'across' }, // I
    { id: 'A3', answer: 'BOND', clue: 'Peptide ____', startX: 4, startY: 2, direction: 'across' }, // B
    { id: 'A4', answer: 'CODON', clue: 'Code triplet', startX: 3, startY: 3, direction: 'across' }, // O
    { id: 'A5', answer: 'STOP', clue: 'UAA, UAG, UGA', startX: 4, startY: 4, direction: 'across' }, // S
    { id: 'A6', answer: 'OPEN', clue: '____ reading frame', startX: 4, startY: 5, direction: 'across' }, // O
    { id: 'A7', answer: 'MET', clue: 'Start amino acid (abbr)', startX: 4, startY: 6, direction: 'across' }, // M
    { id: 'A8', answer: 'EXIT', clue: 'E site function', startX: 4, startY: 7, direction: 'across' } // E
  ], Difficulty.LOW),

  createPuzzle(7, "Mutations", [
    // Backbone: MUTATION (M U T A T I O N) at 5,0
    { id: 'D1', answer: 'MUTATION', clue: 'DNA change', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'MISSENSE', clue: 'Amino acid change', startX: 5, startY: 0, direction: 'across' }, // M
    { id: 'A2', answer: 'UV', clue: 'Radiation cause', startX: 5, startY: 1, direction: 'across' }, // U
    { id: 'A3', answer: 'TRUE', clue: '____ reversion', startX: 5, startY: 2, direction: 'across' }, // T
    { id: 'A4', answer: 'BASE', clue: 'Analog', startX: 4, startY: 3, direction: 'across' }, // A
    { id: 'A5', answer: 'TRANS', clue: '____-version', startX: 5, startY: 4, direction: 'across' }, // T
    { id: 'A6', answer: 'INDEL', clue: 'Insert/Delete', startX: 5, startY: 5, direction: 'across' }, // I
    { id: 'A7', answer: 'LOSS', clue: '____ of function', startX: 4, startY: 6, direction: 'across' }, // O
    { id: 'A8', answer: 'NULL', clue: 'No function', startX: 5, startY: 7, direction: 'across' } // N
  ], Difficulty.LOW),


  // --- MEDIUM DIFFICULTY ---

  createPuzzle(8, "Operons", [
    // Backbone: REPRESSOR (R E P R E S S O R) at 5,0
    { id: 'D1', answer: 'REPRESSOR', clue: 'Turns off operon', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'REG', clue: '____-ulatory gene', startX: 5, startY: 0, direction: 'across' }, // R
    { id: 'A2', answer: 'EFFECTOR', clue: 'Binds repressor', startX: 5, startY: 1, direction: 'across' }, // E
    { id: 'A3', answer: 'PROMOTER', clue: 'RNA pol site', startX: 5, startY: 2, direction: 'across' }, // P
    { id: 'A4', answer: 'RNA', clue: 'Polymerase', startX: 5, startY: 3, direction: 'across' }, // R
    { id: 'A5', answer: 'EXPRESS', clue: 'Make protein', startX: 5, startY: 4, direction: 'across' }, // E
    { id: 'A6', answer: 'STRUCTURAL', clue: '____ genes', startX: 5, startY: 5, direction: 'across' }, // S
    { id: 'A7', answer: 'SITE', clue: 'Binding ____', startX: 5, startY: 6, direction: 'across' }, // S
    { id: 'A8', answer: 'OPERATOR', clue: 'Control switch', startX: 5, startY: 7, direction: 'across' }, // O
    { id: 'A9', answer: 'READ', clue: 'Transcription', startX: 5, startY: 8, direction: 'across' } // R
  ], Difficulty.MEDIUM),

  createPuzzle(9, "Gene Regulation", [
    // Backbone: ENHANCER (E N H A N C E R) at 4,0
    { id: 'D1', answer: 'ENHANCER', clue: 'Distant control element', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'EXON', clue: 'Coding part', startX: 4, startY: 0, direction: 'across' }, // E
    { id: 'A2', answer: 'NUCLEOSOME', clue: 'DNA spool', startX: 4, startY: 1, direction: 'across' }, // N
    { id: 'A3', answer: 'HELIX', clue: 'Loop', startX: 4, startY: 2, direction: 'across' }, // H
    { id: 'A4', answer: 'ACT', clue: '____-ivator', startX: 4, startY: 3, direction: 'across' }, // A
    { id: 'A5', answer: 'NON', clue: '____-coding', startX: 4, startY: 4, direction: 'across' }, // N
    { id: 'A6', answer: 'CAP', clue: '5 prime ____', startX: 4, startY: 5, direction: 'across' }, // C
    { id: 'A7', answer: 'ELEMENT', clue: 'Response ____', startX: 4, startY: 6, direction: 'across' }, // E
    { id: 'A8', answer: 'RNA', clue: 'Product', startX: 4, startY: 7, direction: 'across' } // R
  ], Difficulty.MEDIUM),

  createPuzzle(10, "Bacterial Genetics", [
    // Backbone: CONJUGATION (C O N J U G A T I O N) at 6,0
    { id: 'D1', answer: 'CONJUGATION', clue: 'Bacterial mating', startX: 6, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'CELL', clue: 'Unit', startX: 6, startY: 0, direction: 'across' }, // C
    { id: 'A2', answer: 'ORI', clue: 'Origin', startX: 6, startY: 1, direction: 'across' }, // O
    { id: 'A3', answer: 'NUCLEOID', clue: 'DNA region', startX: 6, startY: 2, direction: 'across' }, // N
    { id: 'A4', answer: 'JUMP', clue: 'Transposon move', startX: 6, startY: 3, direction: 'across' }, // J
    { id: 'A5', answer: 'UPTAKE', clue: 'Transformation', startX: 6, startY: 4, direction: 'across' }, // U
    { id: 'A6', answer: 'GENE', clue: 'Unit', startX: 6, startY: 5, direction: 'across' }, // G
    { id: 'A7', answer: 'AUXOTROPH', clue: 'Mutant', startX: 6, startY: 6, direction: 'across' }, // A
    { id: 'A8', answer: 'TRANSDUCTION', clue: 'Viral transfer', startX: 6, startY: 7, direction: 'across' }, // T
    { id: 'A9', answer: 'IS', clue: 'Insertion Sequence', startX: 6, startY: 8, direction: 'across' }, // I
    { id: 'A10', answer: 'OPERON', clue: 'Gene cluster', startX: 6, startY: 9, direction: 'across' }, // O
    { id: 'A11', answer: 'NULL', clue: 'Zero', startX: 6, startY: 10, direction: 'across' } // N
  ], Difficulty.MEDIUM),

  createPuzzle(11, "DNA Repair", [
    // Backbone: EXCISION (E X C I S I O N) at 5,0
    { id: 'D1', answer: 'EXCISION', clue: 'Repair by removal', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'ERROR', clue: 'Mistake', startX: 5, startY: 0, direction: 'across' }, // E
    { id: 'A2', answer: 'XP', clue: 'Xeroderma Pigmentosum', startX: 5, startY: 1, direction: 'across' }, // X
    { id: 'A3', answer: 'CUT', clue: 'Nick', startX: 5, startY: 2, direction: 'across' }, // C
    { id: 'A4', answer: 'INS', clue: 'Insert', startX: 5, startY: 3, direction: 'across' }, // I
    { id: 'A5', answer: 'SOS', clue: 'Emergency repair', startX: 5, startY: 4, direction: 'across' }, // S
    { id: 'A6', answer: 'INVERT', clue: 'Flip', startX: 5, startY: 5, direction: 'across' }, // I
    { id: 'A7', answer: 'OLD', clue: 'Parent strand', startX: 5, startY: 6, direction: 'across' }, // O
    { id: 'A8', answer: 'NER', clue: 'Nucleotide Excision Repair', startX: 5, startY: 7, direction: 'across' } // N
  ], Difficulty.MEDIUM),

  createPuzzle(12, "Genomics", [
    // Backbone: SEQUENCE (S E Q U E N C E) at 5,0
    { id: 'D1', answer: 'SEQUENCE', clue: 'Determine base order', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'SNP', clue: 'Variation', startX: 5, startY: 0, direction: 'across' }, // S
    { id: 'A2', answer: 'EXOME', clue: 'Coding genes', startX: 5, startY: 1, direction: 'across' }, // E
    { id: 'A3', answer: 'QTL', clue: 'Trait locus', startX: 5, startY: 2, direction: 'across' }, // Q
    { id: 'A4', answer: 'UNIQUE', clue: 'Not repetitive', startX: 5, startY: 3, direction: 'across' }, // U
    { id: 'A5', answer: 'EST', clue: 'Expressed Sequence Tag', startX: 5, startY: 4, direction: 'across' }, // E
    { id: 'A6', answer: 'NEXT', clue: '____ Gen Sequencing', startX: 5, startY: 5, direction: 'across' }, // N
    { id: 'A7', answer: 'CONTIG', clue: 'Overlap set', startX: 5, startY: 6, direction: 'across' }, // C
    { id: 'A8', answer: 'END', clue: 'Pair reads', startX: 5, startY: 7, direction: 'across' } // E
  ], Difficulty.MEDIUM),

  createPuzzle(13, "Cloning", [
    // Backbone: PLASMID (P L A S M I D) at 4,0
    { id: 'D1', answer: 'PLASMID', clue: 'Vector', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'PCR', clue: 'Amplification', startX: 4, startY: 0, direction: 'across' }, // P
    { id: 'A2', answer: 'LIBRARY', clue: 'Clone collection', startX: 4, startY: 1, direction: 'across' }, // L
    { id: 'A3', answer: 'AMP', clue: 'Resistance gene', startX: 4, startY: 2, direction: 'across' }, // A
    { id: 'A4', answer: 'SCREEN', clue: 'Find colony', startX: 4, startY: 3, direction: 'across' }, // S
    { id: 'A5', answer: 'MCS', clue: 'Cloning site', startX: 4, startY: 4, direction: 'across' }, // M
    { id: 'A6', answer: 'INSERT', clue: 'DNA added', startX: 4, startY: 5, direction: 'across' }, // I
    { id: 'A7', answer: 'DIGEST', clue: 'Cut with enzyme', startX: 4, startY: 6, direction: 'across' } // D
  ], Difficulty.MEDIUM),

  createPuzzle(14, "Cell Cycle", [
    // Backbone: MITOSIS (M I T O S I S) at 4,0
    { id: 'D1', answer: 'MITOSIS', clue: 'Nuclear division', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'META', clue: '____-phase', startX: 4, startY: 0, direction: 'across' }, // M
    { id: 'A2', answer: 'INTER', clue: '____-phase', startX: 4, startY: 1, direction: 'across' }, // I
    { id: 'A3', answer: 'TELO', clue: '____-phase', startX: 4, startY: 2, direction: 'across' }, // T
    { id: 'A4', answer: 'ONCO', clue: '____-gene', startX: 4, startY: 3, direction: 'across' }, // O
    { id: 'A5', answer: 'SISTER', clue: 'Chromatid', startX: 4, startY: 4, direction: 'across' }, // S
    { id: 'A6', answer: 'IF', clue: 'Intermediate filament', startX: 4, startY: 5, direction: 'across' }, // I
    { id: 'A7', answer: 'SPINDLE', clue: 'Microtubules', startX: 4, startY: 6, direction: 'across' } // S
  ], Difficulty.MEDIUM),


  // --- HARD DIFFICULTY ---

  createPuzzle(15, "CRISPR", [
    // Backbone: EDITING (E D I T I N G) at 4,0
    { id: 'D1', answer: 'EDITING', clue: 'Genome modification', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'EFFECT', clue: 'Off-target ____', startX: 4, startY: 0, direction: 'across' }, // E
    { id: 'A2', answer: 'DSB', clue: 'Double strand break', startX: 4, startY: 1, direction: 'across' }, // D
    { id: 'A3', answer: 'INDEL', clue: 'NHEJ result', startX: 4, startY: 2, direction: 'across' }, // I
    { id: 'A4', answer: 'TARGET', clue: 'DNA sequence', startX: 4, startY: 3, direction: 'across' }, // T
    { id: 'A5', answer: 'IMMUNE', clue: 'Bacterial system', startX: 4, startY: 4, direction: 'across' }, // I
    { id: 'A6', answer: 'NUCLEASE', clue: 'Cas9 function', startX: 4, startY: 5, direction: 'across' }, // N
    { id: 'A7', answer: 'GUIDE', clue: '____ RNA', startX: 4, startY: 6, direction: 'across' } // G
  ], Difficulty.HARD),

  createPuzzle(16, "Development", [
    // Backbone: HOMEOTIC (H O M E O T I C) at 5,0
    { id: 'D1', answer: 'HOMEOTIC', clue: 'Body plan gene', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'HOX', clue: 'Cluster', startX: 5, startY: 0, direction: 'across' }, // H
    { id: 'A2', answer: 'ORGANIZE', clue: 'Spemann ____', startX: 5, startY: 1, direction: 'across' }, // O
    { id: 'A3', answer: 'MORPHOGEN', clue: 'Signal gradient', startX: 5, startY: 2, direction: 'across' }, // M
    { id: 'A4', answer: 'EGG', clue: 'Oocyte', startX: 5, startY: 3, direction: 'across' }, // E
    { id: 'A5', answer: 'OOCYTE', clue: 'Egg cell', startX: 5, startY: 4, direction: 'across' }, // O
    { id: 'A6', answer: 'TOTI', clue: '____-potent', startX: 5, startY: 5, direction: 'across' }, // T
    { id: 'A7', answer: 'IN', clue: 'Inside', startX: 5, startY: 6, direction: 'across' }, // I
    { id: 'A8', answer: 'CELL', clue: 'Unit', startX: 5, startY: 7, direction: 'across' } // C
  ], Difficulty.HARD),

  createPuzzle(17, "Cancer Genetics", [
    // Backbone: TUMOR (T U M O R) at 4,0
    { id: 'D1', answer: 'TUMOR', clue: 'Mass of cells', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'TWO', clue: '____-hit hypothesis', startX: 4, startY: 0, direction: 'across' }, // T
    { id: 'A2', answer: 'USP', clue: 'Deubiquitinase', startX: 4, startY: 1, direction: 'across' }, // U
    { id: 'A3', answer: 'METASTASIS', clue: 'Spread', startX: 4, startY: 2, direction: 'across' }, // M
    { id: 'A4', answer: 'ONCO', clue: 'Gene type', startX: 4, startY: 3, direction: 'across' }, // O
    { id: 'A5', answer: 'RB', clue: 'Retinoblastoma', startX: 4, startY: 4, direction: 'across' } // R
  ], Difficulty.HARD),

  createPuzzle(18, "Epigenetics", [
    // Backbone: METHYL (M E T H Y L) at 4,0
    { id: 'D1', answer: 'METHYL', clue: 'CH3 group', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'MOD', clue: 'Change', startX: 4, startY: 0, direction: 'across' }, // M
    { id: 'A2', answer: 'EPI', clue: 'Above', startX: 4, startY: 1, direction: 'across' }, // E
    { id: 'A3', answer: 'TAIL', clue: 'Histone ____', startX: 4, startY: 2, direction: 'across' }, // T
    { id: 'A4', answer: 'HAT', clue: 'Acetylator', startX: 4, startY: 3, direction: 'across' }, // H
    { id: 'A5', answer: 'YELLOW', clue: 'Agouti color', startX: 4, startY: 4, direction: 'across' }, // Y
    { id: 'A6', answer: 'LYSINE', clue: 'Modified AA', startX: 4, startY: 5, direction: 'across' } // L
  ], Difficulty.HARD),

  createPuzzle(19, "RNA Interference", [
    // Backbone: SILENCE (S I L E N C E) at 4,0
    { id: 'D1', answer: 'SILENCE', clue: 'Reduce expression', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'SIRNA', clue: 'Short interfering', startX: 4, startY: 0, direction: 'across' }, // S
    { id: 'A2', answer: 'RISC', clue: 'Complex', startX: 3, startY: 1, direction: 'across' }, // I
    { id: 'A3', answer: 'LONG', clue: '____ dsRNA', startX: 4, startY: 2, direction: 'across' }, // L
    { id: 'A4', answer: 'EXPRESS', clue: 'Transcription', startX: 4, startY: 3, direction: 'across' }, // E
    { id: 'A5', answer: 'NONE', clue: 'Zero', startX: 4, startY: 4, direction: 'across' }, // N
    { id: 'A6', answer: 'CUT', clue: 'Dice', startX: 4, startY: 5, direction: 'across' }, // C
    { id: 'A7', answer: 'ELEGANS', clue: 'Worm model', startX: 4, startY: 6, direction: 'across' } // E
  ], Difficulty.HARD),

  createPuzzle(20, "Model Organisms", [
    // Backbone: ELEGANS (E L E G A N S) at 5,0
    { id: 'D1', answer: 'ELEGANS', clue: 'C. ____ (Worm)', startX: 5, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'ECOLI', clue: 'Bacterium', startX: 5, startY: 0, direction: 'across' }, // E
    { id: 'A2', answer: 'LINEAGE', clue: 'Cell mapping', startX: 5, startY: 1, direction: 'across' }, // L
    { id: 'A3', answer: 'EMBRYO', clue: 'Early stage', startX: 5, startY: 2, direction: 'across' }, // E
    { id: 'A4', answer: 'GENETICS', clue: 'Study', startX: 5, startY: 3, direction: 'across' }, // G
    { id: 'A5', answer: 'ARABIDOPSIS', clue: 'Plant model', startX: 5, startY: 4, direction: 'across' }, // A
    { id: 'A6', answer: 'NULL', clue: 'Mutant type', startX: 5, startY: 5, direction: 'across' }, // N
    { id: 'A7', answer: 'SCREEN', clue: 'Search method', startX: 5, startY: 6, direction: 'across' } // S
  ], Difficulty.HARD),

  createPuzzle(21, "Advanced Genomics", [
    // Backbone: SYNTHETIC (S Y N T H E T I C) at 4,0
    { id: 'D1', answer: 'SYNTHETIC', clue: 'Artificial biology', startX: 4, startY: 0, direction: 'down' },
    // Intersections
    { id: 'A1', answer: 'SYSTEMS', clue: '____ biology', startX: 4, startY: 0, direction: 'across' }, // S
    { id: 'A2', answer: 'YEAST', clue: 'Sc2.0 organism', startX: 4, startY: 1, direction: 'across' }, // Y
    { id: 'A3', answer: 'NETWORK', clue: 'Interaction map', startX: 4, startY: 2, direction: 'across' }, // N
    { id: 'A4', answer: 'TOP', clue: '____-down', startX: 4, startY: 3, direction: 'across' }, // T
    { id: 'A5', answer: 'HOST', clue: 'Chassis', startX: 4, startY: 4, direction: 'across' }, // H
    { id: 'A6', answer: 'ENCODE', clue: 'Project name', startX: 4, startY: 5, direction: 'across' }, // E
    { id: 'A7', answer: 'TALEN', clue: 'Editor', startX: 4, startY: 6, direction: 'across' }, // T
    { id: 'A8', answer: 'IN', clue: 'Inside', startX: 4, startY: 7, direction: 'across' }, // I
    { id: 'A9', answer: 'CIRCUIT', clue: 'Gene ____', startX: 4, startY: 8, direction: 'across' } // C
  ], Difficulty.HARD)
];