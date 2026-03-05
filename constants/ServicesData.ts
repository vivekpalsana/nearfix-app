export const SERVICES = [
    { id: 8, name: 'Appliances', icon: 'washing-machine', color: '#EFF6FF', iconColor: '#3B82F6', type: 'material' },
    { id: 1, name: 'AC Service', icon: 'snowflake', color: '#E0F2FE', iconColor: '#38BDF8', type: 'material' },
    { id: 2, name: 'Cleaning', icon: 'broom', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
    { id: 3, name: 'Plumbing', icon: 'water-pump', color: '#ECFDF5', iconColor: '#10B981', type: 'material' },
    { id: 4, name: 'Electrician', icon: 'lightbulb-on', color: '#FFFBEB', iconColor: '#F59E0B', type: 'material' },
    { id: 5, name: 'Painting', icon: 'palette', color: '#FFF1F2', iconColor: '#FB7185', type: 'material' },
    { id: 6, name: 'Carpenter', icon: 'hammer', color: '#F8FAFC', iconColor: '#475569', type: 'material' },
    { id: 7, name: 'Home Repair', icon: 'tools', color: '#FFF7ED', iconColor: '#FB923C', type: 'material' },
    { id: 9, name: 'Automotive', icon: 'car-wrench', color: '#F8FAFC', iconColor: '#64748B', type: 'material' },
    { id: 10, name: 'Beauty', icon: 'face-woman', color: '#FDF2F8', iconColor: '#EC4899', type: 'material' },
    { id: 11, name: 'Education', icon: 'school', color: '#F0FDF4', iconColor: '#22C55E', type: 'material' },
    { id: 12, name: 'IT Services', icon: 'laptop', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
    { id: 13, name: 'Events', icon: 'party-popper', color: '#FFF1F2', iconColor: '#F43F5E', type: 'material' },
    { id: 14, name: 'Moving', icon: 'truck-delivery', color: '#FEFCE8', iconColor: '#EAB308', type: 'material' },
    { id: 15, name: 'Emergency', icon: 'alert-decagram', color: '#FEF2F2', iconColor: '#EF4444', type: 'material' },
];

export const SUB_SERVICES: Record<string, any[]> = {
    'Appliances': [
        { id: 101, name: 'TV Repair', icon: 'television-classic', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 102, name: 'Microwave', icon: 'microwave', color: '#F0F9FF', iconColor: '#0284C7' },
        { id: 103, name: 'RO Service', icon: 'water-filter', color: '#ECFDF5', iconColor: '#059669' },
        { id: 104, name: 'Geyser', icon: 'hot-tub', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'AC Service': [
        { id: 201, name: 'Gas Refill', icon: 'gas-cylinder', color: '#F0FDF4', iconColor: '#22C55E' },
        { id: 202, name: 'Deep Clean', icon: 'air-filter', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 203, name: 'Installation', icon: 'tools', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 204, name: 'Repair & Fix', icon: 'wrench-outline', color: '#FFF1F2', iconColor: '#F43F5E' },
    ],
    'Cleaning': [
        { id: 301, name: 'Full House', icon: 'home-clean', color: '#F5F3FF', iconColor: '#8B5CF6' },
        { id: 302, name: 'Bathroom', icon: 'shower', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 303, name: 'Kitchen', icon: 'chef-hat', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 304, name: 'Sofa/Carpet', icon: 'sofa', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 305, name: 'Balcony', icon: 'flower-outline', color: '#F0FDF4', iconColor: '#22C55E' },
        { id: 306, name: 'Windows', icon: 'window-maximize', color: '#FEF2F2', iconColor: '#EF4444' },
    ],
    'Plumbing': [
        { id: 401, name: 'Tap & Mixer', icon: 'water-pump', color: '#E0F2FE', iconColor: '#0EA5E9' },
        { id: 402, name: 'Pipe Leakage', icon: 'pipe-leak', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 403, name: 'Toilet/Bath', icon: 'toilet', color: '#F8FAFC', iconColor: '#64748B' },
        { id: 404, name: 'Water Tank', icon: 'tank', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 405, name: 'Sanitary', icon: 'wrench-outline', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'Electrician': [
        { id: 501, name: 'Fan Repair', icon: 'fan', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 502, name: 'Switch/Socket', icon: 'power-socket-eu', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 503, name: 'Wiring/MCB', icon: 'expansion-card', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 504, name: 'Lights', icon: 'lightbulb-outline', color: '#FDF2F8', iconColor: '#DB2777' },
    ],
    'Painting': [
        { id: 601, name: 'Full Home', icon: 'home-modern', color: '#F5F3FF', iconColor: '#8B5CF6' },
        { id: 602, name: 'Interior', icon: 'format-paint', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 603, name: 'Texture', icon: 'texture-box', color: '#FFF1F2', iconColor: '#FB7185' },
        { id: 604, name: 'Wood Polish', icon: 'brush', color: '#FEFCE8', iconColor: '#EAB308' },
    ],
    'Carpenter': [
        { id: 701, name: 'Furniture Repair', icon: 'hammer-wrench', color: '#F8FAFC', iconColor: '#475569' },
        { id: 702, name: 'Door/Window', icon: 'door-open', color: '#FFF7ED', iconColor: '#EA580C' },
        { id: 703, name: 'Lock/Hinge', icon: 'lock-cog', color: '#F0F9FF', iconColor: '#0369A1' },
        { id: 704, name: 'New Assembly', icon: 'wardrobe-outline', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Home Repair': [
        { id: 801, name: 'Tiles & Stone', icon: 'wall', color: '#F0F9FF', iconColor: '#0284C7' },
        { id: 802, name: 'POP & Gypsum', icon: 'format-paint', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 803, name: 'Waterproofing', icon: 'water-off', color: '#ECFDF5', iconColor: '#059669' },
        { id: 804, name: 'Drill & Hang', icon: 'drill', color: '#FFFBEB', iconColor: '#D97706' },
    ],
    'Automotive': [
        { id: 901, name: 'Car Wash', icon: 'car-wash', color: '#E0F2FE', iconColor: '#0EA5E9' },
        { id: 902, name: 'Full Service', icon: 'car-cog', color: '#F8FAFC', iconColor: '#475569' },
        { id: 903, name: 'Battery', icon: 'battery-charging-100', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 904, name: 'Tires/Wheels', icon: 'tire', color: '#F0FDF4', iconColor: '#22C55E' },
    ],
    'Beauty': [
        { id: 1001, name: 'Salon at Home', icon: 'face-woman-shimmer', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1002, name: 'Facial/Cleanup', icon: 'spa', color: '#ECFDF5', iconColor: '#059669' },
        { id: 1003, name: 'Mani-Pedi', icon: 'hand-wave', color: '#FFFBEB', iconColor: '#D97706' },
        { id: 1004, name: 'Hair Styling', icon: 'content-cut', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Education': [
        { id: 1101, name: 'Home Tutors', icon: 'book-open-variant', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1102, name: 'Languages', icon: 'translate', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1103, name: 'Coding/STEM', icon: 'code-braces', color: '#FAFAF9', iconColor: '#44403C' },
        { id: 1104, name: 'Music/Arts', icon: 'music-clef-treble', color: '#FFF1F2', iconColor: '#E11D48' },
    ],
    'IT Services': [
        { id: 1201, name: 'Laptop Repair', icon: 'laptop-off', color: '#F0F9FF', iconColor: '#0369A1' },
        { id: 1202, name: 'Software', icon: 'microsoft-windows', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1203, name: 'WiFi/Network', icon: 'wifi-cog', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1204, name: 'Data Recovery', icon: 'database-search', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'Events': [
        { id: 1301, name: 'Decoration', icon: 'balloon', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1302, name: 'Photography', icon: 'camera-iris', color: '#F8FAFC', iconColor: '#475569' },
        { id: 1303, name: 'Catering', icon: 'silverware-fork-knife', color: '#FFFBEB', iconColor: '#D97706' },
        { id: 1304, name: 'DJ & Sound', icon: 'speaker-group', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Moving': [
        { id: 1401, name: 'Packers & Movers', icon: 'truck-check', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1402, name: 'Furniture Shift', icon: 'sofa-single-outline', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1403, name: 'Bike Transport', icon: 'motorbike', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1404, name: 'Rent a Tempo', icon: 'truck-fast', color: '#FFFBEB', iconColor: '#D97706' },
    ],
    'Emergency': [
        { id: 1501, name: 'Locksmith', icon: 'key-alert', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 1502, name: 'Spark/Fire', icon: 'fire-circle', color: '#FFF1F2', iconColor: '#F43F5E' },
        { id: 1503, name: 'Major Leakage', icon: 'water-alert', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 1504, name: 'SOS Help', icon: 'shield-alert', color: '#F8FAFC', iconColor: '#1E293B' },
    ],
};

export const OFFERS = [
    {
        id: 1,
        color: '#E0F2FE',
        gradient: ['#E0F2FE', '#BAE6FD'],
        title: '50% OFF',
        subtitle: 'On your first AC service',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/911/911409.png' }
    },
    {
        id: 2,
        color: '#FDF2F8',
        gradient: ['#FDF2F8', '#FBCFE8'],
        title: 'Flat ₹200 OFF',
        subtitle: 'On full house cleaning',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2954/2954847.png' }
    },
    {
        id: 3,
        color: '#FFFBEB',
        gradient: ['#FFFBEB', '#FEF3C7'],
        title: 'Free Checkup',
        subtitle: 'On all plumbing works',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/3125/3125381.png' }
    },
    {
        id: 4,
        color: '#E0F2FE',
        gradient: ['#1E293B', '#334155'],
        title: 'Flash Sale',
        subtitle: 'Rs. 499 - House Cleaning',
        isExclusive: true,
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2954/2954847.png' }
    },
    {
        id: 5,
        color: '#FDF2F8',
        gradient: ['#F43F5E', '#FB7185'],
        title: 'VIP 50%',
        subtitle: 'Exclusive Salon Package',
        isExclusive: true,
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2707/2707142.png' }
    },
    {
        id: 6,
        color: '#ECFDF5',
        gradient: ['#059669', '#10B981'],
        title: 'Tech Bundle',
        subtitle: 'Free installation on IT',
        isExclusive: true,
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/911/911409.png' }
    },
];


export const EXCLUSIVE_OFFERS = [
    {
        id: 1,
        title: 'Super Splash Sale',
        subtitle: 'Up to 70% OFF on all House Cleaning & Sanitization!',
        label: 'BEST SELLER',
        expiry: 'Only 3 hours left!',
        code: 'SPLASH70',
        gradient: ['#6366F1', '#8B5CF6'],
        color: '#6366F1',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2954/2954847.png' }
    },
    {
        id: 2,
        title: 'VIP Home Care',
        subtitle: 'Get a dedicated professional for all repairs for 1 month',
        label: 'PREMIUM',
        expiry: 'Valid for Prime Members',
        code: 'PRIMECARE',
        gradient: ['#F43F5E', '#E11D48'],
        color: '#F43F5E',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/3125/3125381.png' }
    },
    {
        id: 3,
        title: 'Tech Upgrade',
        subtitle: 'Flat ₹500 OFF on Laptop, Mobile & IT Services',
        label: 'HOT DEAL',
        expiry: 'Ends at Midnight',
        code: 'TECH500',
        gradient: ['#10B981', '#059669'],
        color: '#10B981',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/911/911409.png' }
    },
    {
        id: 4,
        title: 'Glamour Night',
        subtitle: 'Buy 1 Get 1 Free on all Beauty & Salon Packages',
        label: 'EXCLUSIVE',
        expiry: 'Limited Slots',
        code: 'GLAMOUR',
        gradient: ['#EC4899', '#DB2777'],
        color: '#EC4899',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2707/2707142.png' }
    },
    {
        id: 5,
        title: 'Fresh Air Special',
        subtitle: 'Flat 40% OFF on AC Deep Cleaning and Gas Refill',
        label: 'SUMMER SPECIAL',
        expiry: 'Valid this week',
        code: 'AIR40',
        gradient: ['#0EA5E9', '#2563EB'],
        color: '#0EA5E9',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/911/911409.png' }
    },
    {
        id: 6,
        title: 'Master Chef Plus',
        subtitle: 'Free chimney service with full kitchen cleaning',
        label: 'LIMITED',
        expiry: 'Ends in 48 hours',
        code: 'KITCHENPRO',
        gradient: ['#F59E0B', '#D97706'],
        color: '#F59E0B',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2954/2954847.png' }
    },
    {
        id: 7,
        title: 'Safe & Secure',
        subtitle: 'Rs. 200 Discount on all Locksmith & Emergency',
        label: 'EMERGENCY',
        expiry: 'Always Available',
        code: 'SAFEFIX',
        gradient: ['#64748B', '#1E293B'],
        color: '#64748B',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/3125/3125381.png' }
    },
    {
        id: 8,
        title: 'Wall Magic',
        subtitle: 'Get 1 wall texture free with full home painting',
        label: 'DESIGNER',
        expiry: 'Festive Season Only',
        code: 'WALLART',
        gradient: ['#8B5CF6', '#D946EF'],
        color: '#8B5CF6',
        image: { uri: 'https://cdn-icons-png.flaticon.com/512/2707/2707142.png' }
    }

];

export const ALL_SUB_SERVICES = Object.keys(SUB_SERVICES).flatMap(category =>
    SUB_SERVICES[category].map(service => ({
        ...service,
        category: category
    }))
);
