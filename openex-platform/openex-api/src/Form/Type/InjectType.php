<?php

namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('inject_title');
        $builder->add('inject_description');
        $builder->add('inject_content');
        $builder->add('inject_date', DateTimeType::class, array(
            'widget' => 'single_text',
            'input' => 'datetime'
        ));
        $builder->add('inject_audiences');
        $builder->add('inject_subaudiences');
        $builder->add('inject_type');
        $builder->add('inject_enabled');
        $builder->add('inject_all_audiences');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'App\Entity\Inject',
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);
    }
}
