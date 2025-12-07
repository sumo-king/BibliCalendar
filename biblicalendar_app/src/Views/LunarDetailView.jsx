import { useState, useEffect } from 'react';
import { Moon } from 'lunarphase-js';
import {
    ArrowLeft,
    Moon as MoonIcon,
    Info,
    Calendar as CalendarIcon,
    BookOpen,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react';

export const LunarDetailView = ({ onBack, isDarkMode }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [moonData, setMoonData] = useState(null);
    const [activeTab, setActiveTab] = useState('significance'); // 'significance' or 'education'

    useEffect(() => {
        // Calculate reliable moon data
        const currentCalDate = new Date();
        const phase = Moon.lunarPhase(currentCalDate);
        const age = Moon.lunarAge(currentCalDate);
        const agePercent = Moon.lunarAgePercent(currentCalDate); // 0.0 to 1.0
        const phaseEmoji = Moon.lunarPhaseEmoji(currentCalDate); // Updated per documentation
        const phaseName = Moon.lunarPhase(currentCalDate); // This returns string name

        // Calculate illumination: New Moon (0/1) = 0%, Full Moon (0.5) = 100%
        // Sine wave approximation or 1 - cos logic
        // If agePercent is 0.5 (Full), we want 1.0. If 0 or 1, we want 0.0.
        // Formula: (1 - Math.cos(agePercent * 2 * Math.PI)) / 2
        const illuminationFraction = (1 - Math.cos(agePercent * 2 * Math.PI)) / 2;

        // Distance in km (Earth Radii * 6371)
        const distanceRadii = Moon.lunarDistance(currentCalDate);
        const distanceKm = Math.round(distanceRadii * 6371);

        setCurrentDate(currentCalDate);

        // Calculate upcoming phases dates
        // Average lunar cycle is approximately 29.53 days
        const LUNAR_CYCLE = 29.53;
        const currentAge = Moon.lunarAge(currentCalDate);

        // Days until next New Moon (Age 0/29.53)
        const daysToNew = LUNAR_CYCLE - currentAge;
        const nextNewDate = new Date(currentCalDate);
        nextNewDate.setDate(currentCalDate.getDate() + daysToNew);

        // Days until next Full Moon (Age ~14.765)
        let daysToFull = 14.765 - currentAge;
        if (daysToFull < 0) {
            daysToFull += LUNAR_CYCLE;
        }
        const nextFullDate = new Date(currentCalDate);
        nextFullDate.setDate(currentCalDate.getDate() + daysToFull);

        const nextNew = nextNewDate;
        const nextFull = nextFullDate;

        setMoonData({
            phase: phaseName,
            phaseName,
            illumination: (illuminationFraction * 100).toFixed(0),
            age: age.toFixed(1),
            agePercent: (agePercent * 100),
            emoji: phaseEmoji,
            distance: distanceKm,
            nextNew: nextNew ? nextNew.toLocaleDateString() : 'Calculating...',
            nextFull: nextFull ? nextFull.toLocaleDateString() : 'Calculating...',
            // zodiac: getMoonZodiac(age) // Simple approximation
        });
    }, []);

    // Simple Zodiac approximation based on moon age (totally approximate for visual demo)
    // const getMoonZodiac = (age) => {
    //     const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    //     const index = Math.floor((age / 29.53) * 12) % 12;
    //     return zodiacs[index];
    // };

    const theme = {
        bg: isDarkMode ? '#1a1a1a' : '#f6f5f0',
        cardBg: isDarkMode ? '#2c2c2c' : '#fff',
        text: isDarkMode ? '#e0e0e0' : '#2c3e50',
        subText: isDarkMode ? '#aaa' : '#6c757d',
        accent: '#d4af37', // Gold for holy aesthetics
        secondaryAccent: '#667eea', // Soft blue for moon
        border: isDarkMode ? '#444' : '#e0e0e0'
    };

    if (!moonData) return <div style={{ padding: '2rem', color: theme.text }}>Loading lunar data...</div>;

    return (
        <div style={{ ...styles.container, color: theme.text }}>
            {/* Header */}
            <div style={styles.header}>
                <button
                    onClick={onBack}
                    style={{ ...styles.backButton, color: theme.text, borderColor: theme.border, backgroundColor: theme.cardBg }}
                >
                    <ArrowLeft size={20} />
                    {/* <span>Back to Calendar</span> */}
                </button>
                <div style={styles.headerTitle}>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Lunar Calendar</h1>
                    <span style={{ color: theme.subText, fontSize: '0.9rem' }}>
                        {currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
                <div style={{ width: 100 }}></div> {/* Spacer for alignment */}
            </div>

            {/* Hero: Current Moon Phase */}
            <div style={{ ...styles.heroCard, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                <div style={styles.heroContent}>
                    <div style={styles.moonVisual}>
                        <div style={{ fontSize: '8rem', lineHeight: 1 }}>{moonData.emoji}</div>
                    </div>
                    <div style={styles.heroInfo}>
                        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: theme.secondaryAccent }}>{moonData.phaseName}</h2>
                        <div style={styles.heroStats}>
                            <div style={styles.statItem}>
                                <span style={{ color: theme.subText }}>Illumination</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{moonData.illumination}%</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={{ color: theme.subText }}>Lunar Age</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Day {moonData.age}</span>
                            </div>
                        </div>
                        <div style={{ ...styles.progressBarContainer, backgroundColor: isDarkMode ? '#444' : '#e9ecef' }}>
                            <div
                                style={{
                                    ...styles.progressBarFill,
                                    width: `${moonData.agePercent}%`,
                                    backgroundColor: theme.accent
                                }}
                            />
                        </div>
                        <p style={{ color: theme.subText, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Currently in the {moonData.phase} phase of the 29.5-day cycle.
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Grid */}
            <div style={styles.grid}>
                {/* Today's Details */}
                <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                    <div style={{ ...styles.cardHeader, borderBottomColor: theme.border }}>
                        <Info size={18} color={theme.accent} />
                        <span style={{ fontWeight: 600 }}>Daily Details</span>
                    </div>
                    <div style={styles.cardContent}>
                        <DetailRow label="Distance" value={`${moonData.distance.toLocaleString()} km`} theme={theme} />
                        <DetailRow label="Constellation" value={moonData.zodiac} theme={theme} />
                        <DetailRow label="Next New Moon" value={moonData.nextNew} theme={theme} />
                        <DetailRow label="Next Full Moon" value={moonData.nextFull} theme={theme} />
                    </div>
                </div>

                {/* Timeline Preview (Static for now) */}
                <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                    <div style={{ ...styles.cardHeader, borderBottomColor: theme.border }}>
                        <CalendarIcon size={18} color={theme.accent} />
                        <span style={{ fontWeight: 600 }}>Cycle Progress</span>
                    </div>
                    <div style={{ ...styles.cardContent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem' }}>🌑</div>
                                <span style={{ fontSize: '0.8rem', color: theme.subText }}>New</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem' }}>🌓</div>
                                <span style={{ fontSize: '0.8rem', color: theme.subText }}>First Q</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem' }}>🌕</div>
                                <span style={{ fontSize: '0.8rem', color: theme.subText }}>Full</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem' }}>🌗</div>
                                <span style={{ fontSize: '0.8rem', color: theme.subText }}>Last Q</span>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '4px', backgroundColor: theme.border, borderRadius: '2px', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: `${moonData.agePercent}%`,
                                top: '-6px',
                                width: '16px',
                                height: '16px',
                                backgroundColor: theme.accent,
                                borderRadius: '50%',
                                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Info */}
            <div style={styles.tabsContainer}>
                <button
                    style={{
                        ...styles.tab,
                        borderColor: activeTab === 'significance' ? theme.accent : 'transparent',
                        color: activeTab === 'significance' ? theme.accent : theme.subText
                    }}
                    onClick={() => setActiveTab('significance')}
                >
                    <Sparkles size={16} />
                    Biblical Significance
                </button>
                <button
                    style={{
                        ...styles.tab,
                        borderColor: activeTab === 'education' ? theme.secondaryAccent : 'transparent',
                        color: activeTab === 'education' ? theme.secondaryAccent : theme.subText
                    }}
                    onClick={() => setActiveTab('education')}
                >
                    <BookOpen size={16} />
                    Educational Info
                </button>
            </div>

            {/* Tab Content */}
            <div style={{ ...styles.contentSection, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                {activeTab === 'significance' ? (
                    <div>
                        <AccordionSection
                            title="Moon in Scripture"
                            icon={<BookOpen size={18} />}
                            isOpen={true}
                            theme={theme}
                        >
                            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                <li style={{ marginBottom: '0.8rem' }}>
                                    <strong>Genesis 1:16</strong> — "God made two great lights—the greater light to govern the day and the lesser light to govern the night."
                                </li>
                                <li style={{ marginBottom: '0.8rem' }}>
                                    <strong>Psalm 104:19</strong> — "He made the moon to mark the seasons, and the sun knows when to go down."
                                </li>
                                <li>
                                    <strong>Psalm 8:3</strong> — "When I consider your heavens, the work of your fingers, the moon and the stars, which you have set in place..."
                                </li>
                            </ul>
                        </AccordionSection>

                        <AccordionSection
                            title="Festivals & The Moon"
                            icon={<CalendarIcon size={18} />}
                            theme={theme}
                        >
                            <p>The Biblical calendar is lunisolar, meaning months are based on the moon while years align with the sun. Major festivals are timed to moon phases:</p>
                            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Passover (Pesach):</strong> Begins on the 14th of Nisan, which is always a Full Moon.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Tabernacles (Sukkot):</strong> Begins on the 15th of Tishrei, also a Full Moon.</li>
                                <li><strong>Rosh Chodesh:</strong> The "Head of the Month" is celebrated at the New Moon sighting.</li>
                            </ul>
                        </AccordionSection>
                    </div>
                ) : (
                    <div>
                        <AccordionSection
                            title="Understanding Lunar Phases"
                            icon={<Info size={18} />}
                            isOpen={true}
                            theme={theme}
                        >
                            <p>As the Moon orbits Earth, its position relative to the Sun changes. We see different amounts of the Moon's sunlit side.</p>
                            <p style={{ marginTop: '0.5rem' }}>The cycle takes approximately <strong>29.53 days</strong> to complete. This period is called a "Synodic Month".</p>
                        </AccordionSection>

                        <AccordionSection
                            title="Why Does the Moon Change?"
                            icon={<MoonIcon size={18} />}
                            theme={theme}
                        >
                            <p>The Moon doesn't produce its own light; it reflects sunlight. The "phases" are simply the shadow of the Moon itself blocking our view of the illuminated half.</p>
                            <p style={{ marginTop: '0.5rem' }}>When the Moon is between Earth and Sun, the lit side faces away (New Moon). When Earth is between Moon and Sun, the lit side faces us (Full Moon).</p>
                        </AccordionSection>
                    </div>
                )}
            </div>

        </div>
    );
};

const DetailRow = ({ label, value, theme }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ color: theme.subText }}>{label}</span>
        <span style={{ fontWeight: 500, color: theme.text }}>{value}</span>
    </div>
);

const AccordionSection = ({ title, icon, children, theme, isOpen: initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div style={{ borderBottom: `1px solid ${theme.border}` }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.text,
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: theme.accent }}>{icon}</span>
                    {title}
                </div>
                {isOpen ? <ChevronUp size={18} color={theme.subText} /> : <ChevronDown size={18} color={theme.subText} />}
            </button>
            {isOpen && (
                <div style={{ padding: '0 1rem 1.5rem 1rem', color: theme.text, lineHeight: 1.6 }}>
                    {children}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '2rem',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'all 0.2s',
    },
    headerTitle: {
        textAlign: 'center',
    },
    heroCard: {
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid',
        textAlign: 'center',
    },
    heroContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
    },
    moonVisual: {
        filter: 'drop-shadow(0 0 20px rgba(100, 100, 255, 0.2))',
    },
    heroStats: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    progressBarContainer: {
        width: '100%',
        maxWidth: '300px',
        height: '6px',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: '3px',
        transition: 'width 0.5s ease-out',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    card: {
        borderRadius: '12px',
        border: '1px solid',
        overflow: 'hidden',
    },
    cardHeader: {
        padding: '1rem',
        borderBottom: '1px solid',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    cardContent: {
        padding: '1rem',
    },
    tabsContainer: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'none',
        border: 'none',
        borderBottom: '2px solid',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    contentSection: {
        borderRadius: '12px',
        border: '1px solid',
        overflow: 'hidden',
    }
};
