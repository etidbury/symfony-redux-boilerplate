<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;



/**
 * User
 *
 * @ORM\Table(name="fos_user")
 * @ORM\AttributeOverrides({@ORM\AttributeOverride(name="email", column=@ORM\Column(type="string", name="email", length=255, unique=false, nullable=true)),@ORM\AttributeOverride(name="emailCanonical", column=@ORM\Column(type="string", name="email_canonical", length=255, unique=false, nullable=true)),@ORM\AttributeOverride(name="password", column=@ORM\Column(type="string", name="password", length=255, unique=false, nullable=true))
 * })
 * @ORM\Entity()
 *
 * @ExclusionPolicy("all")
 */
class User extends BaseUser
{

    /**
     * @ORM\Id
     * @ORM\Column(name="id",type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose()
     */
    protected $id;
    

}