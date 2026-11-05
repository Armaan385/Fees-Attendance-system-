/**
 * Apex Academy Kota - Live Academic Dispatches & DPP PDF Generator
 * Generates authentic, high-fidelity Kota-standard academic problem sheets,
 * formula sheets, answer keys, and official institutional dispatches.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ApexPdfGenerator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Comprehensive Kota Academic Documents Database
  const ACADEMIC_DISPATCHES = {
    'physics_dpp_18': {
      id: 'physics_dpp_18',
      docCode: 'APX-PHY-DPP-18',
      fileName: 'Apex_Physics_DPP_18_Gauss_Law_and_Dielectrics.pdf',
      subject: 'PHYSICS',
      title: 'DPP-18: Gauss\'s Law, Electric Flux & Dielectric Capacitors',
      target: 'JEE Advanced 2026-27 | Pinnacle Elite Batch (Target AIR < 500)',
      faculty: 'Prof. Vikram Aditya (HOD Physics, Ex-Bansal & Allen Kota)',
      totalMarks: 64,
      timeLimit: '60 Minutes',
      markingScheme: '+4 for Correct, -1 for Incorrect, 0 if Unattempted',
      releaseDate: 'October 28, 2026',
      formulaCheatSheet: [
        'Electric Flux: Phi = integral(E . dA) = q_encl / epsilon_0 (Gauss\'s Law)',
        'Uniformly Charged Solid Sphere (radius R): E_in = (rho * r) / (3 * epsilon_0) ; E_out = (rho * R^3) / (3 * epsilon_0 * r^2)',
        'Capacitor with Variable Dielectric k(x) = k1 + ((k2 - k1)/d)*x : C = (epsilon_0 * A * (k2 - k1)) / (d * ln(k2 / k1))',
        'Dielectric Slab Boundary Condition: E1_parallel = E2_parallel ; D1_perp = D2_perp => k1 * E1_perp = k2 * E2_perp',
        'Pulling Force on Dielectric into Capacitor (V = const): F = 0.5 * (epsilon_0 * b * V^2 * (k - 1)) / d',
        'Energy Stored in Capacitor: U = 0.5 * C * V^2 = Q^2 / (2C) ; Energy Density u = 0.5 * epsilon_0 * k * E^2'
      ],
      questions: [
        {
          qNum: 1,
          type: 'Single Correct (Advanced Level)',
          text: 'A non-conducting solid sphere of radius R has a non-uniform spherically symmetric charge density rho(r) = rho_0 * (1 - r / R), where rho_0 is a positive constant and r is the distance from the center. The radial distance r_max at which the magnitude of electric field E(r) attains its maximum value inside the sphere is:',
          options: [
            '(A) R / 2',
            '(B) 2R / 3',
            '(C) 3R / 4',
            '(D) R / sqrt(3)'
          ],
          correct: '(B) 2R / 3',
          solution: 'By Gauss Law for spherical symmetry: q_encl(r) = 4*pi*integral_0^r [rho_0*(r\'^2 - r\'^3/R)] dr\' = 4*pi*rho_0 * [r^3/3 - r^4/(4R)].\nNow E(r) = q_encl / (4*pi*epsilon_0 * r^2) = (rho_0 / epsilon_0) * [r/3 - r^2/(4R)].\nTo maximize E(r), set dE/dr = 0 => 1/3 - 2r/(4R) = 0 => r = (4/6)*R = 2R/3.\nAt r = 2R/3, d^2E/dr^2 = -1/(2R*epsilon_0) < 0 (Confirmed Maximum).'
        },
        {
          qNum: 2,
          type: 'Calculus & Solid Angle Integration',
          text: 'A point charge q is placed on the axis of a thin disc of radius R at a perpendicular distance d = R * sqrt(3) from its center. The electric flux passing through the circular disc is:',
          options: [
            '(A) q / (6 * epsilon_0)',
            '(B) q * (1 - sqrt(3)/2) / (2 * epsilon_0)',
            '(C) q / (12 * epsilon_0)',
            '(D) q * sqrt(3) / (4 * epsilon_0)'
          ],
          correct: '(B) q * (1 - sqrt(3)/2) / (2 * epsilon_0)',
          solution: 'The solid angle subtended by a disc of radius R at distance d is Omega = 2*pi * (1 - cos(theta)), where cos(theta) = d / sqrt(R^2 + d^2).\nHere d = R*sqrt(3), so sqrt(R^2 + d^2) = sqrt(R^2 + 3R^2) = 2R.\nThus cos(theta) = R*sqrt(3) / (2R) = sqrt(3)/2.\nTotal flux Phi = (q / 4*pi*epsilon_0) * Omega = (q / 4*pi*epsilon_0) * 2*pi * (1 - sqrt(3)/2) = q * (1 - sqrt(3)/2) / (2*epsilon_0).'
        },
        {
          qNum: 3,
          type: 'Dielectric Inhomogeneity (JEE Advanced Multi-Concept)',
          text: 'A parallel plate capacitor of plate area A and separation d is filled with a dielectric whose dielectric constant varies with position x (measured from the left plate, 0 <= x <= d) as k(x) = k_1 * (1 + beta * x), where beta = (k_2 - k_1) / (k_1 * d). The equivalent capacitance of the system is:',
          options: [
            '(A) epsilon_0 * A * (k_2 - k_1) / [ d * ln(k_2 / k_1) ]',
            '(B) epsilon_0 * A * (k_1 + k_2) / (2 * d)',
            '(C) epsilon_0 * A * sqrt(k_1 * k_2) / d',
            '(D) 2 * epsilon_0 * A * k_1 * k_2 / [ d * (k_1 + k_2) ]'
          ],
          correct: '(A) epsilon_0 * A * (k_2 - k_1) / [ d * ln(k_2 / k_1) ]',
          solution: 'Consider a thin slice of thickness dx at distance x. The capacitance of this element is dC = [epsilon_0 * k(x) * A] / dx.\nSince these slices are connected in series:\n1/C_eq = integral_0^d (1/dC) = (1 / (epsilon_0 * A)) * integral_0^d [dx / (k_1 + ((k_2 - k_1)/d)*x)].\nLet u = k_1 + ((k_2 - k_1)/d)*x => du = ((k_2 - k_1)/d) dx.\n1/C_eq = [d / (epsilon_0 * A * (k_2 - k_1))] * ln(k_2 / k_1).\nTherefore, C_eq = [epsilon_0 * A * (k_2 - k_1)] / [d * ln(k_2 / k_1)]. (Kota Standard Master Formula).'
        },
        {
          qNum: 4,
          type: 'Concentric Spherical Capacitors & Earthing',
          text: 'Two concentric conducting spherical shells have radii a and b (a < b). The inner shell carries a positive charge Q and the outer shell is grounded (earthed). A dielectric liquid of dielectric constant k fills the region between a and b. What is the total electrostatic energy stored in the electric field?',
          options: [
            '(A) Q^2 * (b - a) / [ 8 * pi * epsilon_0 * k * a * b ]',
            '(B) Q^2 * (b - a) / [ 4 * pi * epsilon_0 * k * a * b ]',
            '(C) Q^2 * b / [ 8 * pi * epsilon_0 * k * a^2 ]',
            '(D) Q^2 * (b + a) / [ 8 * pi * epsilon_0 * k * a * b ]'
          ],
          correct: '(A) Q^2 * (b - a) / [ 8 * pi * epsilon_0 * k * a * b ]',
          solution: 'Capacitance of concentric spherical shells with outer shell grounded is C = [4 * pi * epsilon_0 * k * a * b] / (b - a).\nSince the outer shell is grounded and inner shell has charge Q, all electric field is confined between r = a and r = b.\nTotal stored energy U = Q^2 / (2C) = Q^2 * (b - a) / [ 8 * pi * epsilon_0 * k * a * b ].'
        },
        {
          qNum: 5,
          type: 'Numerical Value Question (Integer 00-99)',
          text: 'A cubical Gaussian surface of side L = 2 m contains a total charge Q enclosed. If the electric flux through five of its faces is measured to be 12 N m^2/C each, and the flux through the sixth face is -30 N m^2/C, find the magnitude of total enclosed charge Q in nano-Coulombs (Take epsilon_0 = 8.85 x 10^-12 C^2/N m^2). Round off to the nearest integer.',
          options: [
            '(Integer answer: 0 to 99)'
          ],
          correct: '0 (or 0.27 nC depending on units; Q = +30 * epsilon_0 = 0.2655 nC)',
          solution: 'Total flux Phi_total = sum(Phi_i) = 5 * (+12) + (-30) = +60 - 30 = +30 N m^2/C.\nBy Gauss\'s Law: Q_enclosed = epsilon_0 * Phi_total = (8.854 x 10^-12 C^2/N m^2) * 30 N m^2/C = 2.656 x 10^-10 C = 0.266 nC.\nKey takeaway: Flux through each face depends on charge position, but the sum over all faces is strictly dependent only on total enclosed charge.'
        }
      ],
      examTips: [
        'Kota Faculty Note 1: In Gauss\'s law, integral(E.dA) = q_encl/epsilon_0, E on the left-hand side is due to ALL charges (inside + outside), but the flux integral evaluates strictly to charges INSIDE.',
        'Kota Faculty Note 2: When battery remains connected during dielectric insertion, V = constant and charge Q increases by factor k. When battery is disconnected before insertion, Q = constant and voltage V decreases by 1/k.',
        'Common Pitfall: Do not forget boundary refraction tan(theta1)/tan(theta2) = k1/k2 when tracing electric field lines through oblique dielectric interfaces.'
      ]
    },

    'chem_dpp_organic': {
      id: 'chem_dpp_organic',
      docCode: 'APX-CHM-MOD-24',
      fileName: 'Apex_Chemistry_Aldehydes_Ketones_Carboxylic_Acids.pdf',
      subject: 'CHEMISTRY',
      title: 'Chemistry Mastery: Aldehydes, Ketones & Carboxylic Acids',
      target: 'NEET UG & JEE Dual Prep | 100% NCERT Line-by-Line Reaction Mechanics',
      faculty: 'Dr. Arvind Sharma (Senior Faculty Organic Chemistry, PhD IIT Bombay)',
      totalMarks: 72,
      timeLimit: '50 Minutes',
      markingScheme: '+4 for Correct, -1 for Incorrect, 0 if Unattempted',
      releaseDate: 'October 28, 2026',
      formulaCheatSheet: [
        'Nucleophilic Carbonyl Addition Reactivity: HCHO > CH3CHO > CH3COCH3 > PhCHO > PhCOCH3 (Steric & Electronic factors)',
        'Aldol Condensation: Requires alpha-H. Forms beta-hydroxy aldehyde/ketone followed by dehydration to alpha,beta-unsaturated carbonyl.',
        'Cannizzaro Reaction: Non-alpha-H carbonyls + conc. NaOH (50%). Hydride transfer is rate determining step (RDS).',
        'Hell-Volhard-Zelinsky (HVZ): R-CH2-COOH + (i) X2 / Red P (ii) H2O -> R-CH(X)-COOH (Alpha-halo carboxylic acid).',
        'Iodoform Test (CHI3, Yellow ppt): Given by compounds having CH3-C=O or CH3-CH(OH)- group.',
        'Tollens\' Test: [Ag(NH3)2]+ OH- reduced to silver mirror by all aldehydes and alpha-hydroxy ketones.'
      ],
      questions: [
        {
          qNum: 1,
          type: 'Reaction Cascade & Structural Elucidation',
          text: 'An organic compound [A] with molecular formula C8H8O gives a positive 2,4-DNP test and gives a yellow crystalline precipitate on treatment with I2 in alkaline solution. On vigorous oxidation with hot alkaline KMnO4 followed by acidification, compound [A] gives a mono-carboxylic acid [B] (M.F. C7H6O2) which is insoluble in cold water. Compound [A] does not reduce Fehling\'s solution. Compound [A] is:',
          options: [
            '(A) 2-Methylbenzaldehyde',
            '(B) Acetophenone (Ph-CO-CH3)',
            '(C) Phenylacetaldehyde (Ph-CH2-CHO)',
            '(D) 4-Methylbenzaldehyde'
          ],
          correct: '(B) Acetophenone (Ph-CO-CH3)',
          solution: '1. C8H8O has degree of unsaturation (DBE) = 8 + 1 - 8/2 = 5 (Benzene ring + 1 double bond/carbonyl).\n2. Positive 2,4-DNP indicates carbonyl (aldehyde or ketone).\n3. Insoluble/negative Fehling test rules out aliphatic aldehydes.\n4. Positive Iodoform test (yellow ppt of CHI3) proves the presence of a methyl ketone (-CO-CH3) group attached to the aromatic ring.\n5. Vigorous KMnO4 oxidation of -COCH3 converts it to -COOH, giving benzoic acid (C7H6O2), which matches [B].\nHence [A] is Acetophenone (C6H5COCH3).'
        },
        {
          qNum: 2,
          type: 'Cross-Cannizzaro Mechanism (Kinetic Isotope Effect)',
          text: 'When an equimolar mixture of Benzaldehyde (C6H5CHO) and Formaldehyde (HCHO) is warmed with concentrated NaOH (50%), the principal products formed are:',
          options: [
            '(A) Benzyl alcohol and Sodium benzoate',
            '(B) Sodium formate and Benzyl alcohol',
            '(C) Methanol and Sodium benzoate',
            '(D) Equimolar mixture of all four products'
          ],
          correct: '(B) Sodium formate and Benzyl alcohol',
          solution: 'Cross-Cannizzaro Reaction Mechanism:\n1. Formaldehyde (HCHO) is sterically unhindered and its carbonyl carbon is significantly more electrophilic than benzaldehyde (due to absence of +R resonance from phenyl ring).\n2. Hydroxide ion (OH-) preferentially attacks HCHO to form the tetrahedral dianionic intermediate [H2C(O-)(OH)].\n3. In the subsequent rate-determining step, hydride ion (H-) is transferred from this intermediate to the carbonyl carbon of Benzaldehyde.\n4. Hence HCHO undergoes oxidation to Formate ion (HCOONa), while Benzaldehyde is reduced to Benzyl alcohol (C6H5CH2OH).'
        },
        {
          qNum: 3,
          type: 'Acid Strength Comparison (NCERT Line-by-Line)',
          text: 'Arrange the following carboxylic acids in increasing order of their acid strength (Ka):\n(I) Fluoroacetic acid  (II) Chloroacetic acid  (III) Bromoacetic acid  (IV) Acetic acid',
          options: [
            '(A) IV < III < II < I',
            '(B) I < II < III < IV',
            '(C) IV < II < III < I',
            '(D) III < IV < II < I'
          ],
          correct: '(A) IV < III < II < I',
          solution: 'Acid strength depends on stability of carboxylate conjugate base (R-COO-).\nElectron-withdrawing inductive effect (-I effect) disperses the negative charge on oxygen and stabilizes the carboxylate anion.\nElectronegativity order: F (4.0) > Cl (3.0) > Br (2.8) > H.\nTherefore, -I power is F-CH2- > Cl-CH2- > Br-CH2- > CH3-.\nOrder of acid strength: CH3COOH < CH2BrCOOH < CH2ClCOOH < CH2FCOOH. (Option A).'
        },
        {
          qNum: 4,
          type: 'Decarboxylation & Beta-Keto Acid Thermolysis',
          text: 'Which of the following beta-keto acids undergoes decarboxylation most readily upon gentle heating?',
          options: [
            '(A) CH3-CO-CH2-COOH (Acetoacetic acid)',
            '(B) CH3-CH2-CH2-COOH',
            '(C) HOOC-CH2-COOH',
            '(D) Ph-COOH'
          ],
          correct: '(A) CH3-CO-CH2-COOH (Acetoacetic acid)',
          solution: 'Beta-keto carboxylic acids undergo rapid thermal decarboxylation via a concerted cyclic 6-membered transition state involving an intramolecular hydrogen bond between the carbonyl oxygen and the carboxylic -OH group.\nThis yields an enol intermediate which instantly tautomerizes to acetone (CH3COCH3) + CO2 gas.\nStandard carboxylic acids without a beta-carbonyl require soda-lime (NaOH + CaO) and high temperatures (>250 C).'
        }
      ],
      examTips: [
        'Kota High-Yield Insight: Wolf-Kishner reduction (NH2NH2 / KOH, glycol, heat) is preferred for acid-sensitive compounds. Clemmensen reduction (Zn-Hg / conc. HCl) is preferred for base-sensitive compounds.',
        'NCERT Trap: Benzaldehyde does NOT reduce Fehling\'s solution, but readily reduces Tollens\' reagent!',
        'Memory Hook: In Aldol condensation, alpha-carbon acts as nucleophile; carbonyl carbon acts as electrophile.'
      ]
    },

    'math_dpp_12': {
      id: 'math_dpp_12',
      docCode: 'APX-MTH-DPP-12',
      fileName: 'Apex_Mathematics_DPP_12_Definite_Integrals.pdf',
      subject: 'MATHEMATICS',
      title: 'Mathematics DPP-12: Definite Integrals & King\'s Property',
      target: 'JEE Advanced 2026-27 | Pinnacle Elite Batch (100 Percentile Club)',
      faculty: 'Er. Rakesh Bansal (HOD Mathematics, B.Tech IIT Roorkee, 22 Yrs Kota Exp.)',
      totalMarks: 60,
      timeLimit: '60 Minutes',
      markingScheme: '+4 for Correct, -1 for Incorrect, 0 if Unattempted',
      releaseDate: 'October 28, 2026',
      formulaCheatSheet: [
        'King\'s Property: integral_a^b f(x) dx = integral_a^b f(a + b - x) dx',
        'Queen\'s Property: integral_0^(2a) f(x) dx = integral_0^a f(x) dx + integral_0^a f(2a - x) dx = 2 * integral_0^a f(x) dx [if f(2a-x)=f(x)]',
        'Leibnitz Rule: d/dx [integral_u(x)^v(x) f(t) dt] = f(v(x)) * v\'(x) - f(u(x)) * u\'(x)',
        'Periodic Functions: If f(x + T) = f(x), then integral_0^(n*T) f(x) dx = n * integral_0^T f(x) dx',
        'Walli\'s Reduction Formula for integral_0^(pi/2) sin^m(x) cos^n(x) dx'
      ],
      questions: [
        {
          qNum: 1,
          type: 'King\'s Property Standard Evaluator',
          text: 'Evaluate the definite integral I = integral_0^(pi/2) [ (sqrt(sin(x))) / (sqrt(sin(x)) + sqrt(cos(x))) ] dx.',
          options: [
            '(A) pi / 2',
            '(B) pi / 4',
            '(C) pi / 8',
            '(D) 1'
          ],
          correct: '(B) pi / 4',
          solution: 'Let I = integral_0^(pi/2) [sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))] dx  ... (Eq 1)\nApplying King\'s Property: x -> pi/2 - x:\nI = integral_0^(pi/2) [sqrt(sin(pi/2 - x)) / (sqrt(sin(pi/2 - x)) + sqrt(cos(pi/2 - x)))] dx\nI = integral_0^(pi/2) [sqrt(cos x) / (sqrt(cos x) + sqrt(sin x))] dx  ... (Eq 2)\nAdding (Eq 1) and (Eq 2):\n2I = integral_0^(pi/2) [ (sqrt(sin x) + sqrt(cos x)) / (sqrt(sin x) + sqrt(cos x)) ] dx = integral_0^(pi/2) 1 dx = [x]_0^(pi/2) = pi/2.\nTherefore, I = pi / 4.'
        },
        {
          qNum: 2,
          type: 'Leibnitz Rule of Differentiation Under Integral',
          text: 'If f(x) = integral_0^x (t^2 - 3t + 2) dt, then the local maximum of f(x) occurs at:',
          options: [
            '(A) x = 1',
            '(B) x = 2',
            '(C) x = 3/2',
            '(D) x = 0'
          ],
          correct: '(A) x = 1',
          solution: 'By Leibnitz Rule:\nf\'(x) = d/dx [integral_0^x (t^2 - 3t + 2) dt] = (x^2 - 3x + 2) * (1) - 0 = (x - 1)(x - 2).\nSetting f\'(x) = 0 gives stationary points x = 1 and x = 2.\nf\'\'(x) = 2x - 3.\nAt x = 1: f\'\'(1) = 2(1) - 3 = -1 < 0 => Local Maximum at x = 1.\nAt x = 2: f\'\'(2) = 2(2) - 3 = +1 > 0 => Local Minimum at x = 2.\nHence maximum occurs at x = 1.'
        },
        {
          qNum: 3,
          type: 'Fractional Part & Greatest Integer Function Integral',
          text: 'The value of the definite integral I = integral_0^100 {x} dx, where {x} denotes the fractional part of x, is:',
          options: [
            '(A) 100',
            '(B) 50',
            '(C) 25',
            '(D) 10'
          ],
          correct: '(B) 50',
          solution: '{x} = x - [x] is a periodic function with fundamental period T = 1.\nUsing periodicity theorem: integral_0^(n*T) f(x) dx = n * integral_0^T f(x) dx.\nHere n = 100, T = 1.\nI = 100 * integral_0^1 {x} dx = 100 * integral_0^1 x dx = 100 * [x^2 / 2]_0^1 = 100 * (1/2) = 50.'
        }
      ],
      examTips: [
        'Kota Advanced Trick: Whenever limits are 0 to pi, check x * f(sin x). Applying King\'s property eliminates the algebraic term x immediately!',
        'Check odd/even symmetry first: integral_(-a)^a f(x) dx = 0 if f(-x) = -f(x). Saves 2-3 minutes in exam.'
      ]
    },

    'neet_biology_drill': {
      id: 'neet_biology_drill',
      docCode: 'APX-BIO-MOD-88',
      fileName: 'Apex_NEET_Biology_Human_Physiology_Drill.pdf',
      subject: 'BIOLOGY',
      title: 'NEET Biology 100-Question Speed Drill: Human Physiology',
      target: 'NEET UG 2026-27 | Target 360/360 in Biology Section',
      faculty: 'Dr. Meenakshi Soni (Senior NEET Biology Mentor, MBBS AIIMS New Delhi)',
      totalMarks: 100,
      timeLimit: '45 Minutes',
      markingScheme: '+4 for Correct, -1 for Incorrect, 0 if Unattempted',
      releaseDate: 'October 28, 2026',
      formulaCheatSheet: [
        'Tidal Volume (TV) = 500 mL ; Inspiratory Reserve Volume (IRV) = 2500-3000 mL ; Expiratory Reserve Volume (ERV) = 1000-1100 mL',
        'Vital Capacity (VC) = IRV + TV + ERV (~4600 mL) ; Total Lung Capacity (TLC) = VC + RV (~5800 mL)',
        'Cardiac Output = Stroke Volume x Heart Rate = 70 mL x 72 bpm = 5040 mL/min (~5 Litres/min)',
        'Glomerular Filtration Rate (GFR) = 125 mL/min = 180 Litres/day ; Urine output ~ 1.5 Litres/day (99% reabsorbed)',
        'Juxtaglomerular Apparatus (JGA): Fall in GFR activates JG cells to release Renin -> Angiotensin I -> Angiotensin II -> Aldosterone (RAAS)'
      ],
      questions: [
        {
          qNum: 1,
          type: 'NCERT Statement I & Statement II (Pattern 2024-2026)',
          text: 'Given below are two statements:\nStatement I: The counter current mechanism in the Henle\'s loop and vasa recta helps to maintain a concentration gradient in the medullary interstitium.\nStatement II: The medullary gradient is mainly caused by NaCl and urea.\nIn the light of the above statements, choose the most appropriate answer:',
          options: [
            '(A) Both Statement I and Statement II are correct.',
            '(B) Both Statement I and Statement II are incorrect.',
            '(C) Statement I is correct but Statement II is incorrect.',
            '(D) Statement I is incorrect but Statement II is correct.'
          ],
          correct: '(A) Both Statement I and Statement II are correct.',
          solution: 'Refer NCERT Class 11 Biology, Chapter 19 "Excretory Products and their Elimination", Page 296.\nThe flow of filtrate in two limbs of Henle\'s loop and blood flow in two limbs of vasa recta are in opposite directions, creating counter current systems.\nThis gradient is maintained by NaCl (transported by ascending limb of Henle\'s loop and exchanged with descending limb of vasa recta) and urea (enters thin ascending limb and diffuses into collecting tubule medullary interstitium). Both statements are word-for-word true from NCERT.'
        },
        {
          qNum: 2,
          type: 'Endocrine & Feedback Control Axis',
          text: 'A decrease in blood pressure / volume stimulates the release of:',
          options: [
            '(A) Atrial Natriuretic Factor (ANF)',
            '(B) Aldosterone and Renin',
            '(C) Thyroxine',
            '(D) Parathyroid Hormone'
          ],
          correct: '(B) Aldosterone and Renin',
          solution: 'When blood volume or blood pressure falls, the juxtaglomerular cells in the afferent arteriole detect reduced stretch and release Renin.\nRenin converts Angiotensinogen in plasma into Angiotensin I, which ACE converts into Angiotensin II (a powerful vasoconstrictor).\nAngiotensin II directly stimulates the adrenal cortex to secrete Aldosterone, which induces reabsorption of Na+ and water from DCT.\nConversely, ANF is released when blood pressure increases in the right atrium to act as a check on the RAAS system.'
        },
        {
          qNum: 3,
          type: 'Neural Conduction & Synaptic Physiology',
          text: 'During the transmission of a nerve impulse through a nerve fibre, the inner surface of the axonal membrane becomes positively charged due to the rapid influx of:',
          options: [
            '(A) K+ ions',
            '(B) Na+ ions',
            '(C) Cl- ions',
            '(D) Ca2+ ions'
          ],
          correct: '(B) Na+ ions',
          solution: 'NCERT Page 317: When a stimulus is applied at site A on an axonal membrane, voltage-gated Na+ channels open rapidly, allowing Na+ ions to rush inside down their electrochemical gradient.\nThis reverses the polarity: the inner surface becomes positive (+30 mV) and outer surface becomes negative. This event is called Depolarization.'
        }
      ],
      examTips: [
        'NCERT Page Number Rule: 98% of NEET Biology questions are framed verbatim from Class 11 and 12 NCERT textbooks.',
        'High Frequency Chapter: Chemical Coordination & Human Excretory System have generated at least 6-8 questions per paper for the past 5 years.'
      ]
    },

    'circular_rfid_88': {
      id: 'circular_rfid_88',
      docCode: 'APX-DIR-2026-NOT-88',
      fileName: 'Apex_Circular_Biometric_RFID_Grace_Period.pdf',
      subject: 'ADMINISTRATIVE DISPATCH',
      title: 'Biometric RFID Turnstile Gate Operations & Grace Period Regulations',
      target: 'All Enrolled Students (Class 11, Class 12, Dropper Target Batches) & Parents',
      faculty: 'Dr. Rajesh Agrawal (Executive Director) & Registrar Office Kota',
      totalMarks: 0,
      timeLimit: 'Official Institutional Mandate',
      markingScheme: 'Strict Attendance Compliance Protocol',
      releaseDate: 'October 24, 2026',
      formulaCheatSheet: [
        'Campus Gate Opens: 07:30 AM Daily',
        'Academic Session Commencement: 08:00 AM Sharp',
        'Biometric RFID Punch Window: 07:30 AM to 08:15 AM (Includes 15-min emergency grace period)',
        'Automated Parent WhatsApp Alert Dispatch Time: 08:20 AM',
        'Class Entry Lockout: 08:25 AM without Academic Dean Pass'
      ],
      questions: [
        {
          qNum: 1,
          type: 'Regulation Article 1.1 - Smart Card Turnstile Protocol',
          text: 'Every student must carry their dual-frequency RFID Campus Smart Card at all times. Physical cards must be tapped at the motorized optical turnstiles at Gate A (Main Campus Entrance) or Gate B (Hostel Walkway).',
          options: ['Complied by 100% Students'],
          correct: 'Mandatory',
          solution: 'Failure to carry RFID card requires issuance of a temporary one-day barcode visitor badge at Counter 3 upon biometrically verifying fingerprint against the master database.'
        },
        {
          qNum: 2,
          type: 'Regulation Article 2.4 - Instant Parental SMS & WhatsApp Gateway',
          text: 'The cloud campus server synchronously registers attendance. If a student has not punched by 08:15 AM, an automated message is delivered to the registered guardian WhatsApp number: "[ALERT] Your ward has not entered campus premises for Batch P-01 as of 08:15 AM."',
          options: ['Active 24x7 Gateway'],
          correct: 'Automated',
          solution: 'Ensures zero bunking and complete transparency between parents, hostel wardens, and faculty counselors.'
        }
      ],
      examTips: [
        'Minimum required attendance for test series eligibility and Kota scholarship continuation is 85.0%.',
        'Medical leaves must be uploaded directly via the unified parent portal (portal.html#attendance) with registered medical practitioner certificate.'
      ]
    }
  };

  // Helper function to resolve requested document ID or fuzzy title
  function resolveDoc(idOrTitle) {
    if (!idOrTitle) return ACADEMIC_DISPATCHES['physics_dpp_18'];
    const lower = String(idOrTitle).toLowerCase();
    
    if (ACADEMIC_DISPATCHES[lower]) return ACADEMIC_DISPATCHES[lower];
    
    if (lower.includes('physics') || lower.includes('dpp-18') || lower.includes('gauss') || lower.includes('capacit')) {
      return ACADEMIC_DISPATCHES['physics_dpp_18'];
    }
    if (lower.includes('chem') || lower.includes('aldehyde') || lower.includes('ketone') || lower.includes('organic')) {
      return ACADEMIC_DISPATCHES['chem_dpp_organic'];
    }
    if (lower.includes('math') || lower.includes('integral') || lower.includes('dpp-12') || lower.includes('curve')) {
      return ACADEMIC_DISPATCHES['math_dpp_12'];
    }
    if (lower.includes('bio') || lower.includes('physiol') || lower.includes('neet') || lower.includes('drill')) {
      return ACADEMIC_DISPATCHES['neet_biology_drill'];
    }
    if (lower.includes('circular') || lower.includes('rfid') || lower.includes('turnstile') || lower.includes('88')) {
      return ACADEMIC_DISPATCHES['circular_rfid_88'];
    }
    
    // Default fallback to physics dpp 18
    return ACADEMIC_DISPATCHES['physics_dpp_18'];
  }

  // Load jsPDF library dynamically if not yet in window
  function getJsPdfInstance() {
    if (window.jspdf && window.jspdf.jsPDF) {
      return window.jspdf.jsPDF;
    }
    if (window.jsPDF) {
      return window.jsPDF;
    }
    return null;
  }

  // Generate authentic multi-page PDF with jsPDF
  function buildPdfDocument(docData) {
    const JsPDFClass = getJsPdfInstance();
    if (!JsPDFClass) {
      throw new Error('jsPDF library not available in runtime environment');
    }

    const doc = new JsPDFClass({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 36; // 0.5 inch margins
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // Helper: Header banner on each page
    function renderPageHeader(pageNo, totalPagesEstimate) {
      // Top Institutional Brand Bar
      doc.setFillColor(11, 25, 44); // Deep Midnight Blue
      doc.rect(0, 0, pageWidth, 54, 'F');

      // Golden Accent Stripe
      doc.setFillColor(245, 158, 11); // Amber / Gold
      doc.rect(0, 54, pageWidth, 3, 'F');

      // Title & Subtitle inside Header
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('APEX ACADEMY KOTA', margin, 26);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(203, 213, 225); // Slate 300
      doc.text('CENTRAL DISPATCH REPOSITORY  |  DEPARTMENT OF ACADEMIC EXCELLENCE', margin, 42);

      // Document Code Right Aligned
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(251, 191, 36); // Gold 400
      doc.text(docData.docCode, pageWidth - margin, 32, { align: 'right' });
    }

    // Helper: Footer banner on each page
    function renderPageFooter(pageNo) {
      const footerY = pageHeight - 24;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Apex Academy Kota  -  Strictly for Enrolled Classroom Students  -  Unauthorized Reproduction Prohibited', margin, footerY);

      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${pageNo}`, pageWidth - margin, footerY, { align: 'right' });
    }

    // Helper: Subtle background watermark
    function renderWatermark() {
      doc.saveGraphicsState && doc.saveGraphicsState();
      doc.setTextColor(230, 235, 245);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(42);
      // Center diagonal watermark text
      doc.text('APEX ACADEMY KOTA', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      doc.restoreGraphicsState && doc.restoreGraphicsState();
    }

    // Page 1 Setup
    let currentPage = 1;
    renderWatermark();
    renderPageHeader(currentPage);
    y = 74;

    // Document Metadata Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.roundedRect(margin, y, contentWidth, 76, 4, 4, 'FD');

    // Title inside Box
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(docData.title, margin + 12, y + 20);

    // Metadata lines
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Target Course: ${docData.target}`, margin + 12, y + 36);
    doc.text(`Faculty In-Charge: ${docData.faculty}`, margin + 12, y + 50);

    // Right Column in Metadata Box
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(`Total Marks: ${docData.totalMarks || 'N/A'}`, pageWidth - margin - 12, y + 20, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Time Allotted: ${docData.timeLimit}`, pageWidth - margin - 12, y + 36, { align: 'right' });
    doc.text(`Date of Dispatch: ${docData.releaseDate}`, pageWidth - margin - 12, y + 50, { align: 'right' });

    // Marking Scheme Pill
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9);
    doc.text(`Scheme: ${docData.markingScheme}`, margin + 12, y + 66);

    y += 92;

    // SECTION 1: CORE FORMULA CHEAT SHEET & KOTA MNEMONICS
    if (docData.formulaCheatSheet && docData.formulaCheatSheet.length > 0) {
      doc.setFillColor(238, 242, 255); // Soft Indigo
      doc.rect(margin, y, contentWidth, 18, 'F');
      doc.setTextColor(30, 58, 138);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('SECTION A: HIGH-YIELD FORMULAE & KEY PRINCIPLES (KOTA CHEAT SHEET)', margin + 8, y + 13);
      y += 24;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);

      docData.formulaCheatSheet.forEach((f, idx) => {
        const bulletText = `* [${idx + 1}] ${f}`;
        const lines = doc.splitTextToSize(bulletText, contentWidth - 10);
        
        if (y + (lines.length * 11) > pageHeight - 45) {
          renderPageFooter(currentPage);
          doc.addPage();
          currentPage++;
          renderWatermark();
          renderPageHeader(currentPage);
          y = 74;
        }

        doc.text(lines, margin + 6, y);
        y += (lines.length * 11) + 2;
      });

      y += 8;
    }

    // SECTION 2: PRACTICE QUESTIONS (ADVANCED LEVEL)
    doc.setFillColor(254, 243, 199); // Soft Amber
    doc.rect(margin, y, contentWidth, 18, 'F');
    doc.setTextColor(146, 64, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('SECTION B: CLASSROOM PROBLEM SET & CHALLENGE DRILL', margin + 8, y + 13);
    y += 26;

    docData.questions.forEach((q) => {
      // Check if we need a new page for question
      if (y > pageHeight - 110) {
        renderPageFooter(currentPage);
        doc.addPage();
        currentPage++;
        renderWatermark();
        renderPageHeader(currentPage);
        y = 74;
      }

      // Question Number & Type Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 58, 138);
      doc.text(`Question ${q.qNum} [${q.type}]`, margin, y);
      y += 12;

      // Question Text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const qLines = doc.splitTextToSize(q.text, contentWidth);
      doc.text(qLines, margin, y);
      y += (qLines.length * 11) + 4;

      // Options
      q.options.forEach((opt) => {
        if (y > pageHeight - 45) {
          renderPageFooter(currentPage);
          doc.addPage();
          currentPage++;
          renderWatermark();
          renderPageHeader(currentPage);
          y = 74;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        doc.text(opt, margin + 14, y);
        y += 11;
      });

      y += 6;
    });

    // Page break before Complete Solutions & Answer Key for authentic Kota standard
    renderPageFooter(currentPage);
    doc.addPage();
    currentPage++;
    renderWatermark();
    renderPageHeader(currentPage);
    y = 74;

    // SECTION 3: OFFICIAL ANSWER KEY GRID
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OFFICIAL VERIFIED ANSWER KEY', margin + 10, y + 15);
    y += 30;

    // Render Answer Key Table
    const colWidth = contentWidth / Math.min(docData.questions.length, 6);
    let tableX = margin;
    doc.setFillColor(30, 58, 138);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');

    docData.questions.forEach((q, i) => {
      doc.rect(tableX + (i * colWidth), y, colWidth, 16, 'F');
      doc.text(`Q${q.qNum}`, tableX + (i * colWidth) + (colWidth / 2), y + 11, { align: 'center' });
    });

    y += 16;
    doc.setFillColor(248, 250, 252);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');

    docData.questions.forEach((q, i) => {
      doc.rect(tableX + (i * colWidth), y, colWidth, 18, 'S');
      const shortAns = q.correct.split(' ')[0] || q.correct.slice(0, 8);
      doc.text(shortAns, tableX + (i * colWidth) + (colWidth / 2), y + 12, { align: 'center' });
    });

    y += 34;

    // SECTION 4: STEP-BY-STEP DETAILED SOLUTIONS & FACULTY SHORTCUTS
    doc.setFillColor(224, 231, 255); // Soft Violet
    doc.rect(margin, y, contentWidth, 18, 'F');
    doc.setTextColor(67, 56, 202);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('SECTION C: STEP-BY-STEP COMPREHENSIVE SOLUTIONS & TRICKS', margin + 8, y + 13);
    y += 24;

    docData.questions.forEach((q) => {
      if (y > pageHeight - 90) {
        renderPageFooter(currentPage);
        doc.addPage();
        currentPage++;
        renderWatermark();
        renderPageHeader(currentPage);
        y = 74;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 58, 138);
      doc.text(`Solution to Question ${q.qNum} (Correct Option: ${q.correct})`, margin, y);
      y += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);

      const solLines = doc.splitTextToSize(q.solution, contentWidth - 8);
      solLines.forEach((line) => {
        if (y > pageHeight - 45) {
          renderPageFooter(currentPage);
          doc.addPage();
          currentPage++;
          renderWatermark();
          renderPageHeader(currentPage);
          y = 74;
        }
        doc.text(line, margin + 4, y);
        y += 10;
      });

      y += 8;
    });

    // SECTION 5: FACULTY ADVISORY & EXAM TIPS
    if (docData.examTips && docData.examTips.length > 0) {
      if (y > pageHeight - 100) {
        renderPageFooter(currentPage);
        doc.addPage();
        currentPage++;
        renderWatermark();
        renderPageHeader(currentPage);
        y = 74;
      }

      y += 6;
      doc.setFillColor(254, 226, 226); // Soft Rose
      doc.rect(margin, y, contentWidth, 18, 'F');
      doc.setTextColor(153, 27, 27);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('KOTA FACULTY ADVISORY & COMMON ERROR TRAPS', margin + 8, y + 13);
      y += 22;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.8);
      doc.setTextColor(69, 10, 10);

      docData.examTips.forEach((tip) => {
        const tipLines = doc.splitTextToSize(`* ${tip}`, contentWidth - 10);
        tipLines.forEach(l => {
          if (y > pageHeight - 45) {
            renderPageFooter(currentPage);
            doc.addPage();
            currentPage++;
            renderWatermark();
            renderPageHeader(currentPage);
            y = 74;
          }
          doc.text(l, margin + 4, y);
          y += 10;
        });
      });
    }

    // Official Digital Stamp & Signature at Bottom
    if (y > pageHeight - 65) {
      renderPageFooter(currentPage);
      doc.addPage();
      currentPage++;
      renderWatermark();
      renderPageHeader(currentPage);
      y = 74;
    }

    y += 16;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('Verified & Dispatched by:', margin, y);
    doc.text('Official Academic Seal:', pageWidth - margin - 120, y);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(docData.faculty, margin, y);
    doc.text('[SEAL: APEX ACADEMY KOTA - VERIFIED 2026]', pageWidth - margin - 120, y);

    // Final Footer
    renderPageFooter(currentPage);

    return doc;
  }

  // Toast notification for user UI feedback
  function showToast(message, type = 'info') {
    let container = document.getElementById('apex-pdf-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'apex-pdf-toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      pointer-events: auto;
      min-width: 300px;
      max-width: 440px;
      padding: 12px 18px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      border: 1px solid ${type === 'success' ? '#10B981' : '#3B82F6'};
      color: #F8FAFC;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      font-size: 0.88rem;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const icon = type === 'success' ? '✓' : 'ℹ';
    const iconColor = type === 'success' ? '#10B981' : '#3B82F6';

    toast.innerHTML = `
      <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-weight: 800; color: ${iconColor};">
        ${icon}
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 700; color: #FFF; font-size: 0.88rem;">Apex Academic Repository</div>
        <div style="color: #CBD5E1; font-size: 0.80rem; margin-top: 2px;">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4500);
  }

  // Interactive high-fidelity preview modal in high-contrast Spatial Dark UI
  function openDocumentPreviewModal(docData) {
    let existingModal = document.getElementById('apex-pdf-preview-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'apex-pdf-preview-modal';
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(3, 7, 18, 0.85);
      backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.25s ease-out;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      width: 100%;
      max-width: 860px;
      max-height: 90vh;
      background: #0B132B;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(56, 189, 248, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: #F8FAFC;
      transform: scale(0.96);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    // Modal Header
    const modalHeader = `
      <div style="padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.7);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #1E3A8A, #3B82F6); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
            📄
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 800; background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 2px 8px; border-radius: 6px; letter-spacing: 0.05em;">${docData.docCode}</span>
              <span style="font-size: 0.72rem; color: #94A3B8;">${docData.subject} • ${docData.releaseDate}</span>
            </div>
            <h3 style="margin: 3px 0 0 0; font-size: 1.15rem; font-weight: 800; color: #FFFFFF;">${docData.title}</h3>
          </div>
        </div>
        <button id="apex-pdf-close-modal" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; width: 34px; height: 34px; color: #E2E8F0; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
          ✕
        </button>
      </div>
    `;

    // Modal Body (Scrollable Document Viewer)
    const questionsHtml = docData.questions.map((q) => `
      <div style="margin-bottom: 22px; padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-weight: 800; color: #38BDF8; font-size: 0.88rem;">Question ${q.qNum}</span>
          <span style="font-size: 0.75rem; color: #A78BFA; background: rgba(167, 139, 250, 0.1); padding: 2px 8px; border-radius: 4px;">${q.type}</span>
        </div>
        <p style="font-size: 0.90rem; color: #F1F5F9; line-height: 1.6; margin-bottom: 12px; white-space: pre-line;">${q.text}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-bottom: 14px;">
          ${q.options.map(opt => `<div style="font-size: 0.82rem; color: #CBD5E1; padding: 8px 12px; background: rgba(0,0,0,0.25); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">${opt}</div>`).join('')}
        </div>
        <div style="padding: 12px; border-radius: 8px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10B981;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #34D399; margin-bottom: 4px;">Verified Solution & Faculty Working:</div>
          <div style="font-size: 0.82rem; color: #E2E8F0; line-height: 1.55; white-space: pre-line;">${q.solution}</div>
        </div>
      </div>
    `).join('');

    const formulasHtml = (docData.formulaCheatSheet || []).map(f => `
      <li style="margin-bottom: 6px; color: #CBD5E1; font-size: 0.82rem;">${f}</li>
    `).join('');

    const modalBody = `
      <div style="padding: 24px; overflow-y: auto; flex: 1; max-height: calc(90vh - 150px);">
        <!-- Metadata Pill Bar -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; padding: 12px 16px; background: rgba(30, 58, 138, 0.18); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px;">
          <div style="font-size: 0.80rem; color: #93C5FD;"><strong style="color: #FFF;">Target:</strong> ${docData.target}</div>
          <div style="font-size: 0.80rem; color: #93C5FD;"><strong style="color: #FFF;">Faculty:</strong> ${docData.faculty}</div>
          <div style="font-size: 0.80rem; color: #93C5FD;"><strong style="color: #FFF;">Time:</strong> ${docData.timeLimit}</div>
          <div style="font-size: 0.80rem; color: #93C5FD;"><strong style="color: #FFF;">Marking:</strong> ${docData.markingScheme}</div>
        </div>

        <!-- Formula Cheat Sheet Accordion -->
        <div style="margin-bottom: 24px; padding: 16px; border-radius: 12px; background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.2);">
          <h4 style="margin: 0 0 10px 0; color: #FBBF24; font-size: 0.92rem; font-weight: 800; display: flex; align-items: center; gap: 6px;">
            ⚡ Kota Formula & Concept Accelerator
          </h4>
          <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
            ${formulasHtml}
          </ul>
        </div>

        <!-- Questions & Step-by-step solutions -->
        <h4 style="margin: 0 0 16px 0; font-size: 1rem; color: #FFF; font-weight: 800; display: flex; align-items: center; gap: 8px;">
          📚 Complete Problem Set & Step-by-Step Kota Solutions (${docData.questions.length} Items)
        </h4>
        ${questionsHtml}
      </div>
    `;

    // Modal Footer Controls
    const modalFooter = `
      <div style="padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.85); flex-wrap: gap-2;">
        <div style="font-size: 0.78rem; color: #94A3B8;">
          🔒 High-resolution PDF generated dynamically with official Apex Academy Kota watermark.
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="apex-pdf-print-btn" style="padding: 8px 18px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #FFF; font-size: 0.84rem; font-weight: 600; cursor: pointer;">
            🖨️ Print / View
          </button>
          <button id="apex-pdf-save-btn" style="padding: 8px 22px; border-radius: 10px; background: linear-gradient(135deg, #2563EB, #1D4ED8); border: none; color: #FFF; font-size: 0.84rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); display: flex; align-items: center; gap: 6px;">
            ⬇️ Download Official .PDF
          </button>
        </div>
      </div>
    `;

    modalContent.innerHTML = modalHeader + modalBody + modalFooter;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    });

    const closeModal = () => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'scale(0.96)';
      setTimeout(() => modal.remove(), 250);
    };

    document.getElementById('apex-pdf-close-modal').onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    document.getElementById('apex-pdf-save-btn').onclick = () => {
      downloadPdfDirect(docData);
    };

    document.getElementById('apex-pdf-print-btn').onclick = () => {
      window.print();
    };
  }

  // Generate and trigger actual browser file download
  function downloadPdfDirect(docData) {
    showToast(`Generating ${docData.title} (PDF)...`, 'info');

    // Ensure jsPDF is available
    if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
      const script = document.createElement('script');
      script.src = 'js/vendor/jspdf.umd.min.js';
      script.onload = () => {
        try {
          const doc = buildPdfDocument(docData);
          doc.save(docData.fileName);
          showToast(`Downloaded: ${docData.fileName}`, 'success');
        } catch (err) {
          console.error('PDF Generation Error:', err);
          showToast('Could not complete binary PDF generation; opening rich viewer instead.', 'info');
          openDocumentPreviewModal(docData);
        }
      };
      script.onerror = () => {
        openDocumentPreviewModal(docData);
      };
      document.head.appendChild(script);
      return;
    }

    try {
      const doc = buildPdfDocument(docData);
      doc.save(docData.fileName);
      showToast(`Downloaded: ${docData.fileName}`, 'success');
    } catch (err) {
      console.error('PDF Generation Error:', err);
      showToast('Opening high-contrast document viewer...', 'info');
      openDocumentPreviewModal(docData);
    }
  }

  // Public API
  return {
    download: function (idOrTitle, showPreview = true) {
      const docData = resolveDoc(idOrTitle);
      downloadPdfDirect(docData);
      if (showPreview) {
        // Also open high-contrast preview modal so user can immediately examine the rich Kota content
        setTimeout(() => openDocumentPreviewModal(docData), 400);
      }
    },

    openPreview: function (idOrTitle) {
      const docData = resolveDoc(idOrTitle);
      openDocumentPreviewModal(docData);
    },

    getDocData: function (idOrTitle) {
      return resolveDoc(idOrTitle);
    },

    listDispatches: function () {
      return Object.values(ACADEMIC_DISPATCHES);
    }
  };
}));
