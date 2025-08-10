import CtaOptimizer from './cta-optimizer';

const CtaOptimizerSection = () => {
    return (
        <section id="cta-optimizer" className="py-20 md:py-32 bg-secondary">
            <div className="container max-w-4xl mx-auto animate-in fade-in-50 duration-1000">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Optimize Your Call-to-Action</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Not sure if your CTA is effective? Let our AI analyze it and suggest a better version to boost your conversions.
                    </p>
                </div>
                <CtaOptimizer />
            </div>
        </section>
    )
}

export default CtaOptimizerSection;
